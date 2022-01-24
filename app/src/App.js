import React from 'react';

import App from './commons/App';
import locales from './commons/locales';
import Layout from './commons/Layout';
import components from './commons/components';
import * as roles from './commons/roles';
import resources from './admin/resources';
import routes from './admin/routes';
import data from './admin/data';

export default ({history}) =>
    <App
        {...{locales, components, resources, history, data}}
        i18n={locale => import(`./commons/i18n/${locale}`)}
        routes={routes(Layout)}
        roles={Object.fromEntries(Object.entries(roles))}
    />
;
