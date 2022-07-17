import React from 'react';

import AppProvider from './AppContext';
import App from '../admin/App';

export default ({i18n, components, roles, children, ...rest}) =>
    <AppProvider {...{i18n, components, roles}}>
        <App {...rest}>
            {children}
        </App>
    </AppProvider>
;
