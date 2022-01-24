import React, {memo} from 'react';
import JsxParser from 'react-jsx-parser';
import {usePermissions} from 'react-admin';

import {originByData} from './upload';
import {useComponents, useRoles} from './AppContext';

export default memo(data => {

    const components = useComponents();
    const roles = useRoles();
    const {permissions} = usePermissions();
    let {content, files} = data;

    files && files.forEach(name => content = content.replace(
        new RegExp(name, 'g'),
        `${originByData('pages', data)}/${name}`
    ));

    return <JsxParser
        bindings={{
            permissions,
            ...roles
        }}
        {...{components}}
        jsx={content}
        renderInWrapper={false}
    />;
});
