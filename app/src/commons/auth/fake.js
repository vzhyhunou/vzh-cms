import auth, {TOKEN, ROLES} from './back';

export default ({users}) => ({
    ...auth(),
    login: ({username}) => {
        const user = users.find(({id}) => id === username);
        if (!user) {
            throw new Error('User not found');
        }
        const {tags} = user;
        localStorage.setItem(TOKEN, ' ');
        localStorage.setItem(ROLES, tags.map(({name}) => name));
        return Promise.resolve();
    }
});
