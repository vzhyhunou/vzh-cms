import {ROLES} from '../admin/auth';

export default ({users}) => ({
    login: ({ username, password }) => {
        const user = users.find(({id}) => id === username);
        if (!user) {
            throw new Error('User not found');
        }
        const {tags} = user;
        localStorage.setItem(ROLES, tags.map(({name}) => name));
        return Promise.resolve();
    },
    logout: p => {
        localStorage.removeItem(ROLES);
        return Promise.resolve(p);
    },
    checkError: () => Promise.resolve(),
    checkAuth: () => localStorage.getItem(ROLES) ? Promise.resolve() : Promise.reject(),
    getPermissions: () => Promise.resolve(localStorage.getItem(ROLES))
});
