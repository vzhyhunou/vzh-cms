import React from 'react';

import AppProvider from './AppContext';
import App from '../admin/App';

export default ({i18n, src, components, roles, children, ...rest}) =>
    <AppProvider {...{i18n, src, components, roles}}>
        <App {...rest}>
            {children}
        </App>
    </AppProvider>
;
