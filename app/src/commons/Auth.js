import React from 'react';
import {usePermissions} from 'react-admin';

export default ({include, exclude, children}) => {

    const PREFIX = 'ROLE_';
    const {permissions} = usePermissions();
    let approve = false;

    if (include) {
        approve = permissions && permissions.includes(PREFIX + include);
    }

    if (exclude) {
        approve = !permissions || !permissions.includes(PREFIX + exclude);
    }

    return <>
        {approve && children}
    </>;
};
