import React from 'react';

import AppContext from './AppContext';
import App from '../admin/App';

export default ({context, children, ...rest}) =>
    <AppContext {...context}>
        <App {...rest}>
            {children}
        </App>
    </AppContext>
;
