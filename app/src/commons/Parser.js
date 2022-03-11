import React from 'react';
import JsxParser from 'react-jsx-parser';
import {usePermissions} from 'react-admin';

import {useComponents, useRoles} from './AppContext';
import ComponentProvider, {useGetBindings} from './ComponentContext';

const Parser = ({content}) => {

    const components = useComponents();
    const roles = useRoles();
    const {permissions} = usePermissions();
    const getBindings = useGetBindings();

    return <JsxParser
        bindings={{
            permissions,
            ...roles,
            getBindings
        }}
        {...{components}}
        jsx={content}
        renderInWrapper={false}
    />;
};

export default props =>
    <ComponentProvider>
        <Parser {...props}/>
    </ComponentProvider>
;
