import React from 'react';

import AppProvider from './AppContext';
import App from '../admin/App';

export default ({locales, i18n, routes, resources, history}) =>
    <AppProvider
        locales={locales}
        i18n={i18n}
    >
        <App
            routes={routes}
            resources={resources}
            history={history}
        />
    </AppProvider>
;
