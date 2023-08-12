import decodeJwt from 'jwt-decode';

export const TOKEN = 'token';

const setToken = value => localStorage.setItem(TOKEN, value);
const getToken = () => localStorage.getItem(TOKEN);
const removeToken = () => localStorage.removeItem(TOKEN);
const getClaims = () => decodeJwt(getToken());

export default () => ({
    login: ({username, password}) => {
        const credentials = btoa(`${username}:${password}`);
        const auth = {Authorization: `Basic ${credentials}`};
        return fetch('/login', {headers: auth})
            .then(response => {
                if (response.status < 200 || response.status >= 300) {
                    throw new Error(response.statusText);
                }
                return response.text();
            })
            .then(setToken);
    },
    logout: p => {
        removeToken();
        return typeof p === 'string' ? Promise.resolve(p) : Promise.resolve();
    },
    checkError: ({status}) => {
        if (status === 401 || status === 403) {
            removeToken();
            return Promise.reject();
        }
        return Promise.resolve();
    },
    checkAuth: () => getToken() ? Promise.resolve() : Promise.reject(),
    getPermissions: () => Promise.resolve(getClaims()).then(({roles}) => roles),
    setToken: value => Promise.resolve(value).then(setToken),
    getToken: () => Promise.resolve().then(getToken)
});
