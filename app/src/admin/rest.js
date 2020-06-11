import { stringify } from 'query-string';
import { fetchUtils } from 'react-admin';

const client = (getLocale, getToken) => (url, options = {}) => {

    if (!options.headers) {
        options.headers = new Headers();
    }

    const token = getToken();
    token && options.headers.set('Authorization', `Bearer ${token}`);

    options.headers.set('Accept-Language', getLocale());

    return fetchUtils.fetchJson(url, options);
};

export default (getLocale, getToken, apiUrl = '/api', httpClient = client(getLocale, getToken)) => ({

    getList: (resource, params) => {

        const { page, perPage } = params.pagination;
        const { field, order } = params.sort;
        const query = {
            page: page - 1,
            size: perPage,
            sort: `${field},${order}`,
            ...params.filter
        };
        const url = `${apiUrl}/${resource}/search/list?${stringify(query)}`;

        return httpClient(url).then(({ json }) => ({
            data: json._embedded ? json._embedded[resource] : [],
            total: json.page.totalElements
        }));
    },

    getOne: (resource, params) =>
        httpClient(`${apiUrl}/${resource}/${params.id}`).then(({ json }) => ({
            data: json
        })),

    getMany: (resource, params) => {

        const query = {
            ids: params.ids
        };

        return httpClient(`${apiUrl}/${resource}/search/findByIdIn?${stringify(query)}`).then(({ json }) => ({
            data: json._embedded ? json._embedded[resource] : []
        }));
    },

    getManyReference: (resource, params) => {

        const { page, perPage } = params.pagination;
        const { field, order } = params.sort;
        const query = {
            sort: JSON.stringify([field, order]),
            range: JSON.stringify([(page - 1) * perPage, page * perPage - 1]),
            filter: JSON.stringify({
                ...params.filter,
                [params.target]: params.id
            })
        };

        return httpClient(`${apiUrl}/${resource}?${stringify(query)}`).then(({ json }) => ({
            data: json._embedded ? json._embedded[resource] : [],
            total: json.page.totalElements
        }));
    },

    update: (resource, params) =>
        httpClient(`${apiUrl}/${resource}/${params.id}`, {
            method: 'PUT',
            body: JSON.stringify(params.data)
        }).then(({ json }) => ({
            data: json
        })),

    updateMany: (resource, params) =>
        Promise.all(
            params.data.map(json =>
                httpClient(`${apiUrl}/${resource}/${json.id}`, {
                    method: 'PATCH',
                    body: JSON.stringify(json)
                })
            )
        ).then(responses => ({
            data: responses.map(response => response.json)
        })),

    create: (resource, params) =>
        httpClient(`${apiUrl}/${resource}`, {
            method: 'POST',
            body: JSON.stringify(params.data),
        }).then(({ json }) => ({
            data: { ...params.data, id: json.id },
        })),

    delete: (resource, params) =>
        httpClient(`${apiUrl}/${resource}/${params.id}`, {
            method: 'DELETE',
        }).then(({ json }) => ({
            data: json
        })),

    deleteMany: (resource, params) =>
        Promise.all(
            params.ids.map(id =>
                httpClient(`${apiUrl}/${resource}/${id}`, {
                    method: 'DELETE',
                })
            )
        ).then(responses => ({
                data: responses.map(response => response.json),
        })),

    getOneLocale: (resource, params) =>
        httpClient(`${apiUrl}/${resource}/search/one/${params.id}`).then(({ json }) => ({
            data: json
        })),

    getMenuLocale: (resource, params) =>
        httpClient(`${apiUrl}/${resource}/search/menu`).then(({ json }) => ({
            data: json
        }))
});
