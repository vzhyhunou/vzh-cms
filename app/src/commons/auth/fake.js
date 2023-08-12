import back from './back';

export default ({users}) => {

    const auth = back();

    return {
        ...auth,
        login: ({username}) => {
            const user = users.find(({id}) => id === username);
            if (!user) {
                throw new Error('User not found');
            }
            auth.setToken(user.token);
            return Promise.resolve();
        }
    };
};
