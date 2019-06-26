import React, {useEffect, useState} from 'react';
import {AUTH_GET_PERMISSIONS} from 'react-admin';

import authProvider from './auth';

export default ({children}) => {

    const [permissions, setPermissions] = useState();

    useEffect(() => {

        authProvider(AUTH_GET_PERMISSIONS).then(setPermissions, roles => setPermissions([]));
    }, []);

    if (!permissions)
        return <div/>;

    return children(permissions);
};
