import {AUTH_CHECK, AUTH_ERROR, AUTH_GET_PERMISSIONS, AUTH_LOGIN, AUTH_LOGOUT} from 'react-admin';
import decodeJwt from 'jwt-decode';

const TOKEN = 'token';
const ROLES = 'roles';

export default (type, params) => {
    if (type === AUTH_LOGIN) {
        const {username, password} = params;
        const data = new URLSearchParams();
        data.append('username', username);
        data.append('password', password);
        return fetch('/login', {
            method: 'post',
            body: data
        })
            .then(response => {
                if (response.status < 200 || response.status >= 300) {
                    throw new Error(response.statusText);
                }
                return response.text();
            })
            .then(token => {
                const decodedToken = decodeJwt(token);
                localStorage.setItem(TOKEN, token);
                localStorage.setItem(ROLES, decodedToken.roles);
            });
    }
    if (type === AUTH_LOGOUT) {
        localStorage.removeItem(TOKEN);
        localStorage.removeItem(ROLES);
        return Promise.resolve();
    }
    if (type === AUTH_ERROR) {
        const {status} = params;
        if (status === 401 || status === 403) {
            localStorage.removeItem(TOKEN);
            localStorage.removeItem(ROLES);
            return Promise.reject();
        }
        return Promise.resolve();
    }
    if (type === AUTH_CHECK) {
        return localStorage.getItem(TOKEN) ? Promise.resolve() : Promise.reject();
    }
    if (type === AUTH_GET_PERMISSIONS) {
        const roles = localStorage.getItem(ROLES);
        return roles ? Promise.resolve(roles) : Promise.reject();
    }
    return Promise.reject('Unknown method');
}

export const getToken = () => localStorage.getItem(TOKEN);
