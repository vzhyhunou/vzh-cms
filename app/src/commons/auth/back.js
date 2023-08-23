import decodeJwt from 'jwt-decode';

const TOKEN = 'token';

const setItem = value => localStorage.setItem(TOKEN, value);
const getItem = () => localStorage.getItem(TOKEN);
const removeItem = () => localStorage.removeItem(TOKEN);
const getClaims = () => {
    const token = getItem();
    return token ? decodeJwt(token) : {};
};

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
            .then(setItem);
    },
    logout: p => Promise.resolve()
        .then(removeItem)
        .then(() => {
            if (typeof p === 'string') {
                return p;
            }
        }),
    checkError: ({status}) => Promise.resolve()
        .then(() => {
            if (status === 401 || status === 403) {
                removeItem();
                return Promise.reject();
            }
        }),
    checkAuth: () => getItem() ? Promise.resolve() : Promise.reject(),
    getPermissions: () => Promise.resolve().then(getClaims).then(({roles}) => roles),
    getUserId: () => Promise.resolve().then(getClaims).then(({sub}) => sub),
    setToken: value => Promise.resolve(value).then(setItem),
    getToken: () => Promise.resolve().then(getItem)
});
