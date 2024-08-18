import sign from 'jwt-encode';

import back from './back';

export default ({provider: {getOne}}) => {

    const {setToken, ...rest} = back();

    return {
        ...rest,
        login: ({username}) => getOne('users', {id: username})
            .then(({data: {id, tags}}) => ({sub: id, roles: tags.map(({name}) => name)}))
            .then(value => sign(value, ''))
            .then(setToken)
    };
};
