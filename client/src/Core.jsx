import React from 'react';

import Admin from './admin/App';
import Context from './context/App';

export default ({config, children, ...rest}) =>
    <Context {...config}>
        <Admin {...rest}>
            {children}
        </Admin>
    </Context>
;
