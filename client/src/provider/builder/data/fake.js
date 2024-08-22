const log = (type, resource, params, response) => {
    if (console.group) {
        console.groupCollapsed(type, resource, JSON.stringify(params));
        console.log(response);
        console.groupEnd();
    } else {
        console.log('FakeRest request ', type, resource, params);
        console.log('FakeRest response', response);
    }
    return response;
};

const getListResponse = async (
    {getList, getPage, isLocalesIncludes, isTagsActive},
    resource,
    {filter, ...params} = {}
) => {

    if (!filter) {
        return false;
    }

    switch (resource) {
        case 'pages':
            return getList(resource, params).then(({data}) => {
                if (filter.id) {
                    data = data.filter(({id}) => id.includes(filter.id));
                }
                if (filter.title) {
                    data = data.filter(({title}) => isLocalesIncludes(title, filter.title));
                }
                if (filter.content) {
                    data = data.filter(({content}) => isLocalesIncludes(content, filter.content));
                }
                if (filter.tags) {
                    data = data.filter(i => isTagsActive(i, filter.tags));
                }
                return getPage(data, params);
            });
        case 'users':
            return getList(resource, params).then(({data}) => {
                if (filter.id) {
                    data = data.filter(({id}) => id.includes(filter.id));
                }
                if (filter.tags) {
                    data = data.filter(i => isTagsActive(i, filter.tags));
                }
                return getPage(data, params);
            });
        default:
            return false;
    }
};

const exchangeResponse = (
    {
        provider: {getOne, getList, getPath, isTagsActive},
        tags: {
            pages: {MENU, PUBLISHED},
            users: {PAGES_EDITOR}
        },
        localeProvider: {getLocale},
        authProvider: {getPermissions}
    },
    params
) =>

    Promise.all([getLocale(), getPermissions()]).then(([locale, permissions]) => {

        // eslint-disable-next-line no-unused-vars
        const [resource, s, path, id] = getPath(params);

        switch (resource) {
            case 'pages':
                switch (path) {
                    case 'one':
                        return getOne(resource, {id}).then(({data}) => {
                            if (!(isTagsActive(data, [PUBLISHED]) || (permissions && permissions.includes(PAGES_EDITOR)))) {
                                return false;
                            }
                            const {title, content, files} = data;
                            if (!content || !content[locale]) {
                                return false;
                            }
                            return {
                                data: {
                                    id,
                                    title: title && title[locale],
                                    content: content[locale],
                                    files
                                }
                            };
                        }, () => false);
                    case 'menu':
                        return getList(resource).then(({data}) => ({
                            data: data.filter(p => isTagsActive(p, [MENU])).map(({id, title}) => ({
                                id,
                                title: title[locale]
                            }))
                        }));
                    default:
                        return false;
                }
            default:
                return false;
        }
    });

const getUpdateRequest = ({getOne}, resource, params) => {

    const {data} = params;
    const {id, files} = data;

    return getOne(resource, {id}).then(({data: oldData}) => ({
        ...params,
        data: {
            ...data,
            files: files?.map(file => ({
                name: file.name,
                data: file.data || oldData.files.find(({name}) => name === file.name).data
            }))
        },
    }));
};

const getUpdateManyRequests = ({getOne}, resource, {ids, ...params}) =>

    Promise.all(params.data.map(data => {

        const {id, files} = data;

        return getOne(resource, {id}).then(({data: oldData}) => ({
            ...params,
            ...{id},
            data: {
                ...oldData,
                ...data,
                files: files?.map(file => ({
                    name: file.name,
                    data: file.data || oldData.files.find(({name}) => name === file.name).data
                }))
            },
        }));
    }));

export default props => {

    const {locales, provider: {getList, getManyReference, update, updateMany, ...rest}} = props;
    const options = {
        pagination: {page: 1, perPage: Number.MAX_VALUE},
        sort: {field: 'id', order: 'ASC'}
    };
    const provider = {
        ...rest,
        getList: (resource, params = {}) => getList(resource, {...options, ...params}),
        getManyReference: (resource, params) => getManyReference(resource, {...options, ...params}),
        getPath: ({path}) => path.split('/'),
        getPage: (data, {pagination: {page, perPage}}) => ({data: data.slice((page - 1) * perPage, page * perPage), total: data.length}),
        isLocalesIncludes: (src, val) => src && Object.keys(locales).some(l => src[l] && src[l].toLowerCase().includes(val.toLowerCase())),
        isTagsActive: ({tags}, names) => tags && tags.some(({name, start, end}) =>
            names.includes(name) && (!start || new Date() > new Date(start)) && (!end || new Date() < new Date(end)))
    };

    return {
        ...provider,
        getList: (resource, params) => getListResponse(provider, resource, params)
            .then(response => response || provider.getList(resource, params)),
        update: (resource, params) => getUpdateRequest(provider, resource, params)
            .then(request => update(resource, request)),
        updateMany: (resource, params) => getUpdateManyRequests(provider, resource, params)
            .then(requests => Promise.all(requests.map(request => update(resource, request))))
            .then(responses => responses.map(({data: id}) => id))
            .then(ids => ({data: ids})),
        exchange: params => exchangeResponse({...props, provider}, params)
            .then(response => log('exchange', undefined, params, response)),
        log
    };
};
