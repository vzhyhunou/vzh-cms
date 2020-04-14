import React, {useEffect, useState} from 'react';
import {AUTH_GET_PERMISSIONS} from 'react-admin';

import authProvider from './auth';

export default ({children}) => {

    const [values, setValues] = useState();

    useEffect(() => {

        authProvider(AUTH_GET_PERMISSIONS).then(roles => setValues({roles}), () => setValues({}));
    }, []);

    if (!values)
        return <div/>;

    return children(values.roles);
};
