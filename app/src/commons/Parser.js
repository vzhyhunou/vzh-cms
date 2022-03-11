import React from 'react';
import JsxParser from 'react-jsx-parser';
import {usePermissions} from 'react-admin';

import {useComponents, useRoles} from './AppContext';

export default ({content}) => {

    const components = useComponents();
    const roles = useRoles();
    const {permissions} = usePermissions();

    return <JsxParser
        bindings={{
            permissions,
            ...roles
        }}
        {...{components}}
        jsx={content}
        renderInWrapper={false}
    />;
};
