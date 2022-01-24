import React from 'react';

import AppProvider from './AppContext';
import App from '../admin/App';

export default ({locales, i18n, components, roles, ...rest}) =>
    <AppProvider {...{locales, i18n, components, roles}}>
        <App {...rest}/>
    </AppProvider>
;
