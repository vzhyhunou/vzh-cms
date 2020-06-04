import React from 'react';

import TranslationProvider from './commons/TranslationContext';
import Admin from './admin/App';

import locales from './commons/locales';
import routes from './admin/routes';
import resources from './admin/resources';

export default ({history}) =>
    <TranslationProvider
        locales={locales}
        i18n={locale => import(`./commons/i18n/${locale}`)}
    >
        <Admin
            routes={routes}
            resources={resources}
            history={history}
        />
    </TranslationProvider>
;