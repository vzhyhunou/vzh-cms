import decodeJwt from 'jwt-decode';

export const TOKEN = 'token';
export const ROLES = 'roles';

export default () => ({
    login: ({ username, password }) => {
        const credentials = btoa(`${username}:${password}`);
        const auth = { Authorization: `Basic ${credentials}` };
        return fetch('/login', { headers: auth })
            .then(response => {
                if (response.status < 200 || response.status >= 300) {
                    throw new Error(response.statusText);
                }
                return response.text();
            })
            .then(token => {
                localStorage.setItem(TOKEN, token);
                localStorage.setItem(ROLES, decodeJwt(token).roles);
            });
    },
    logout: p => {
        localStorage.removeItem(TOKEN);
        localStorage.removeItem(ROLES);
        return Promise.resolve(p);
    },
    checkError: ({ status }) => {
        if (status === 401 || status === 403) {
            localStorage.removeItem(TOKEN);
            localStorage.removeItem(ROLES);
            return Promise.reject();
        }
        return Promise.resolve();
    },
    checkAuth: () => localStorage.getItem(TOKEN) ? Promise.resolve() : Promise.reject(),
    getPermissions: () => Promise.resolve(localStorage.getItem(ROLES)),
    getToken: () => localStorage.getItem(TOKEN)
});
