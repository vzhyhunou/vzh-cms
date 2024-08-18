import React from 'react';
import JsxParser from 'react-jsx-parser';
import {usePermissions} from 'react-admin';

import {useContextProvider} from '..';

export default ({content, bindings, ...rest}) => {

    const {components, ...context} = useContextProvider();
    const {permissions} = usePermissions();

    return <JsxParser
        bindings={{
            permissions,
            context,
            window,
            JSON,
            ...bindings
        }}
        {...{components}}
        jsx={content}
        renderInWrapper={false}
        autoCloseVoidElements={true}
        showWarnings={true}
        {...rest}
    />;
};
