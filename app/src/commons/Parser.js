import React from 'react';
import JsxParser from 'react-jsx-parser';
import {usePermissions} from 'react-admin';

import {useComponents, useRoles} from './AppContext';

export default ({content, ...rest}) => {

    const components = useComponents();
    const roles = useRoles();
    const {permissions} = usePermissions();

    return <JsxParser
        bindings={{
            permissions,
            ...roles,
            window
        }}
        {...{components}}
        jsx={content}
        renderInWrapper={false}
        autoCloseVoidElements={true}
        showWarnings={true}
        {...rest}
    />;
};
