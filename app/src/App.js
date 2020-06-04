import React from 'react';

import App from './commons/App';

import locales from './commons/locales';
import routes from './admin/routes';
import resources from './admin/resources';

export default ({history}) =>
    <App
        locales={locales}
        i18n={locale => import(`./commons/i18n/${locale}`)}
        routes={routes}
        resources={resources}
        history={history}
    />
;
