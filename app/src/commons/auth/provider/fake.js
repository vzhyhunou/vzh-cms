import back from './back';

export default ({resProvider: {users}}) => {

    const auth = back();

    return {
        ...auth,
        login: ({username}) => Promise.resolve()
            .then(() => users.find(({id}) => id === username))
            .then(user => {
                if (!user) {
                    throw new Error('Unauthorized');
                }
                return user.token;
            })
            .then(auth.setToken)
    };
};
