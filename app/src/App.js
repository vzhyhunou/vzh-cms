import React from 'react';

import App from './commons/App';
import locales from './commons/locales';
import Layout from './commons/Layout';
import resources from './admin/resources';
import routes from './admin/routes';

export default ({history}) =>
    <App
        locales={locales}
        i18n={locale => import(`./commons/i18n/${locale}`)}
        routes={routes(Layout)}
        resources={resources}
        history={history}
    />
;
