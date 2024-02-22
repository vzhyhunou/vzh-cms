import fakeDataProvider from 'ra-data-fakerest';

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

const getListResponse = ({getAll, getPage, isLocalesIncludes, isTagsActive}, resource, params) =>

    getAll(resource, params).then(({data}) => {

        const {filter} = params;

        switch (resource) {
            case 'pages':
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
            case 'users':
                if (filter.id) {
                    data = data.filter(({id}) => id.includes(filter.id));
                }
                if (filter.tags) {
                    data = data.filter(i => isTagsActive(i, filter.tags));
                }
                return getPage(data, params);
            default:
                return false;
        }
    });

const exchangeResponse = ({getOne, getAll, getPath, isTagsActive}, {roles: {PAGES_EDITOR}, localeProvider: {getLocale}, authProvider: {getPermissions}}, params) =>

    Promise.all([getLocale(), getPermissions()]).then(([locale, permissions]) => {

        // eslint-disable-next-line no-unused-vars
        const [resource, s, path, id] = getPath(params);

        switch (resource) {
            case 'pages':
                switch (path) {
                    case 'one':
                        return getOne(resource, {id}).then(({data}) => {
                            if (!(isTagsActive(data, 'PUBLISHED') || (permissions && permissions.includes(PAGES_EDITOR)))) {
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
                                    files: files && files.map(({name}) => name)
                                }
                            };
                        }, () => false);
                    case 'menu':
                        return getAll(resource).then(({data}) => ({
                            data: data.filter(p => isTagsActive(p, ['MENU'])).map(({id, title}) => ({
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

export default props => {

    const {locales, resProvider} = props;
    const {getList, ...rest} = fakeDataProvider(resProvider, true);
    const provider = {
        ...rest,
        getAll: (resource, {sort = {field: 'id', order: 'ASC'}} = {}) => getList(resource, {
            pagination: {
                page: 1,
                perPage: Number.MAX_VALUE
            },
            sort
        }),
        getPath: ({path}) => path.split('/'),
        getPage: (data, {pagination: {page, perPage}}) => ({data: data.slice((page - 1) * perPage, page * perPage), total: data.length}),
        isLocalesIncludes: (src, val) => src && Object.keys(locales).some(l => src[l] && src[l].toLowerCase().includes(val.toLowerCase())),
        isTagsActive: ({tags}, names) => tags && tags.some(({name, start, end}) =>
            names.includes(name) && (!start || new Date() > new Date(start)) && (!end || new Date() < new Date(end)))
    };

    return {
        ...provider,
        getList: (resource, params) => getListResponse(provider, resource, params)
            .then(response => response && log('getList', resource, params, response))
            .then(response => response || getList(resource, params)),
        exchange: params => exchangeResponse(provider, props, params)
            .then(response => log('exchange', undefined, params, response)),
        log
    };
};
