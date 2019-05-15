import {stringify} from 'query-string';
import {
    CREATE,
    DELETE,
    DELETE_MANY,
    GET_LIST,
    GET_MANY,
    GET_MANY_REFERENCE,
    GET_ONE,
    UPDATE,
    UPDATE_MANY,
} from 'react-admin';

import {TOKEN} from './auth';
import fetchUtils from './fetch';

export const GET_ONE_LOCALE = 'GET_ONE_LOCALE';
export const GET_MENU_LOCALE = 'GET_MENU_LOCALE';

const client = (url, options = {}) => {
    const token = localStorage.getItem(TOKEN);
    if (token) {
        if (!options.headers) {
            options.headers = new Headers();
        }
        options.headers.set('Authorization', `Bearer ${token}`);
    }
    return fetchUtils.fetchJson(url, options);
};

export default (locale, apiUrl = '/api', httpClient = client) => {

    const convertDataRequestToHTTP = (type, resource, params) => {
        let url = '';
        const options = {};
        const l = typeof locale === 'function' ? locale() : locale;
        switch (type) {
            case GET_LIST: {
                const {page, perPage} = params.pagination;
                const {field, order} = params.sort;
                const query = {
                    page: page - 1,
                    size: perPage,
                    sort: `${field},${order}`,
                    ...params.filter,
                    locale: l,
                };
                url = `${apiUrl}/${resource}/search/list?${stringify(query)}`;
                break;
            }
            case GET_ONE:
                url = `${apiUrl}/${resource}/${params.id}`;
                break;
            case GET_MANY: {
                const query = {
                    ids: params.ids,
                };
                url = `${apiUrl}/${resource}/search/findByIdIn?${stringify(query)}`;
                break;
            }
            case GET_MANY_REFERENCE: {
                const {page, perPage} = params.pagination;
                const {field, order} = params.sort;
                const query = {
                    sort: JSON.stringify([field, order]),
                    range: JSON.stringify([
                        (page - 1) * perPage,
                        page * perPage - 1,
                    ]),
                    filter: JSON.stringify({
                        ...params.filter,
                        [params.target]: params.id,
                    }),
                };
                url = `${apiUrl}/${resource}?${stringify(query)}`;
                break;
            }
            case UPDATE:
                url = `${apiUrl}/${resource}/${params.id}`;
                options.method = 'PUT';
                options.body = JSON.stringify(params.data);
                break;
            case CREATE:
                url = `${apiUrl}/${resource}`;
                options.method = 'POST';
                options.body = JSON.stringify(params.data);
                break;
            case DELETE:
                url = `${apiUrl}/${resource}/${params.id}`;
                options.method = 'DELETE';
                break;
            case GET_ONE_LOCALE:
                url = `${apiUrl}/${resource}/search/one/${params.id}?${stringify({locale: l})}`;
                break;
            case GET_MENU_LOCALE:
                url = `${apiUrl}/${resource}/search/menu?${stringify({locale: l})}`;
                break;
            default:
                throw new Error(`Unsupported fetch action type ${type}`);
        }
        return {url, options};
    };

    const convertHTTPResponse = (response, type, resource, params) => {
        const {json} = response;
        switch (type) {
            case GET_LIST:
            case GET_MANY_REFERENCE:
                return {
                    data: json._embedded ? json._embedded[resource] : [],
                    total: json.page.totalElements,
                };
            case GET_MANY:
                return {data: json._embedded ? json._embedded[resource] : []};
            case CREATE:
                return {data: {...params.data, id: json.id}};
            default:
                return {data: json};
        }
    };

    return (type, resource, params) => {
        // simple-rest doesn't handle filters on UPDATE route, so we fallback to calling UPDATE n times instead
        if (type === UPDATE_MANY) {
            return Promise.all(
                params.ids.map(id =>
                    httpClient(`${apiUrl}/${resource}/${id}`, {
                        method: 'PUT',
                        body: JSON.stringify(params.data),
                    })
                )
            ).then(responses => ({
                data: responses.map(response => response.json),
            }));
        }
        // simple-rest doesn't handle filters on DELETE route, so we fallback to calling DELETE n times instead
        if (type === DELETE_MANY) {
            return Promise.all(
                params.ids.map(id =>
                    httpClient(`${apiUrl}/${resource}/${id}`, {
                        method: 'DELETE',
                    })
                )
            ).then(responses => ({
                data: responses.map(response => response.json),
            }));
        }

        const {url, options} = convertDataRequestToHTTP(
            type,
            resource,
            params
        );
        return httpClient(url, options).then(response =>
            convertHTTPResponse(response, type, resource, params)
        );
    };
};