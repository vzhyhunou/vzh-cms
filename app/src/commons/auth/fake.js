import back from './back';

export default ({users}) => {

    const auth = back();

    return {
        ...auth,
        login: ({username}) => {
            const user = users.find(({id}) => id === username);
            return Promise.resolve(user)
                .then(user => {
                    if (!user) {
                        throw new Error('Unauthorized');
                    }
                    return user.token;
                })
                .then(auth.setToken);
        }
    };
};
