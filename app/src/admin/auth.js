import decodeJwt from 'jwt-decode';

const TOKEN = 'token';
const ROLES = 'roles';

export default {
    login: ({ username, password }) => {
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
    },
    logout: () => {
        localStorage.removeItem(TOKEN);
        localStorage.removeItem(ROLES);
        return Promise.resolve();
    },
    checkError: ({ status }) => {
        if (status === 401 || status === 403) {
            localStorage.removeItem(TOKEN);
            localStorage.removeItem(ROLES);
            return Promise.reject();
        }
        return Promise.resolve();
    },
    checkAuth: () => {
        return getToken() ? Promise.resolve() : Promise.reject();
    },
    getPermissions: () => {
        const roles = localStorage.getItem(ROLES);
        return Promise.resolve(roles);
    }
};

export const getToken = () => localStorage.getItem(TOKEN);
