import React from 'react';

import TranslationProvider from './TranslationContext';
import App from '../admin/App';

export default ({locales, i18n, routes, resources, history}) =>
    <TranslationProvider
        locales={locales}
        i18n={i18n}
    >
        <App
            routes={routes}
            resources={resources}
            history={history}
        />
    </TranslationProvider>
;