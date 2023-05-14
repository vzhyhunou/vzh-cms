import React from 'react';

import AppProvider from './AppContext';
import App from '../admin/App';

export default ({context, children, ...rest}) =>
    <AppProvider {...context}>
        <App {...rest}>
            {children}
        </App>
    </AppProvider>
;
