import {stringify} from 'query-string';
import {fetchUtils} from 'react-admin';

const API_URL = '/api';

export default (data, {getLocale}, {getToken}) => {

    const httpClient = (url, options = {}) => Promise.all([getLocale(), getToken()])
        .then(([locale, token]) => ({
            ...options,
            headers: new Headers({
                Accept: 'application/json',
                'Accept-Language': locale
            }),
            ...(token ? {
                user: {
                    authenticated: true,
                    token: `Bearer ${token}`
                }
            } : {})
        }))
        .then(options => fetchUtils.fetchJson(url, options));

    return {
        getList: (resource, {pagination, sort, filter, options}) => {
            const {page, perPage} = pagination;
            const {field, order} = sort;
            const query = {
                page: page - 1,
                size: perPage,
                sort: `${field},${order}`,
                ...filter
            };
            return httpClient(`${API_URL}/${resource}/search/list?${stringify(query)}`, options).then(({json}) => ({
                data: json._embedded ? json._embedded[resource] : [],
                total: json.page.totalElements
            }));
        },
        getOne: (resource, {id, options}) =>
            httpClient(`${API_URL}/${resource}/${id}`, options).then(({json}) => ({
                data: json
            })),
        getMany: (resource, {ids, options}) =>
            httpClient(`${API_URL}/${resource}/search/findByIdIn?${stringify({ids})}`, options).then(({json}) => ({
                data: json._embedded ? json._embedded[resource] : []
            })),
        getManyReference: (resource, {pagination, sort, filter, target, id, options}) => {
            const {page, perPage} = pagination;
            const {field, order} = sort;
            const query = {
                sort: JSON.stringify([field, order]),
                range: JSON.stringify([(page - 1) * perPage, page * perPage - 1]),
                filter: JSON.stringify({
                    ...filter,
                    [target]: id
                })
            };
            return httpClient(`${API_URL}/${resource}?${stringify(query)}`, options).then(({json}) => ({
                data: json._embedded ? json._embedded[resource] : [],
                total: json.page.totalElements
            }));
        },
        update: (resource, {id, data, options}) =>
            httpClient(`${API_URL}/${resource}/${id}`, {
                method: 'PUT',
                body: JSON.stringify(data),
                ...options
            }).then(({json}) => ({
                data: json
            })),
        updateMany: (resource, {data, options}) =>
            Promise.all(
                data.map(json =>
                    httpClient(`${API_URL}/${resource}/${json.id}`, {
                        method: 'PATCH',
                        body: JSON.stringify(json),
                        ...options
                    })
                )
            ).then(responses => ({
                data: responses.map(response => response.json)
            })),
        create: (resource, {data, options}) =>
            httpClient(`${API_URL}/${resource}`, {
                method: 'POST',
                body: JSON.stringify(data),
                ...options
            }).then(({json}) => ({
                data: {...data, id: json.id},
            })),
        delete: (resource, {id, options}) =>
            httpClient(`${API_URL}/${resource}/${id}`, {
                method: 'DELETE',
                ...options
            }).then(({json}) => ({
                data: json
            })),
        deleteMany: (resource, {ids, options}) =>
            Promise.all(
                ids.map(id =>
                    httpClient(`${API_URL}/${resource}/${id}`, {
                        method: 'DELETE',
                        ...options
                    })
                )
            ).then(responses => ({
                data: responses.map(response => response.json),
            })),
        exchange: ({path, query, data, options}) =>
            httpClient((path.startsWith('/') ? path : `${API_URL}/${path}`) + (query ? `?${stringify(query)}` : ''), !data ? options : {
                body: JSON.stringify(data),
                ...options
            }).then(({json}) => ({
                data: json && json._embedded ? json._embedded[path.split('/')[0]] : json
            }))
    };
};
