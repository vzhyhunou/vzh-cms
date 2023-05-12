import React from 'react';
import {Route, Navigate} from 'react-router-dom';
import {CustomRoutes, Resource} from 'react-admin';

import Layout from './commons/Layout';
import {App} from './commons';
import {pages, users} from './admin';
import {Page, PageComponent} from './pages';

export const roles = {
    ADMIN: 'ADMIN',
    MANAGER: 'MANAGER',
    PAGES_EDITOR: 'PAGES_EDITOR'
};

const locales = {
    en: 'English',
    ru: 'Русский'
};

const components = {
    Page: PageComponent
};

const i18n = locale => import(`./commons/i18n/${locale}`).then(r => r.default);
const data = process.env.REACT_APP_DATA && import('./data').then(r => r.default);

export default () =>
    <App {...{i18n, locales, components, roles, data}}>
        <CustomRoutes>
            <Route path="/" element={<Navigate to="cms/pages/home"/>}/>
        </CustomRoutes>
        <CustomRoutes noLayout>
            <Route path="cms" element={<Layout/>}>
                <Route path="pages/:id" element={<Page/>}/>
            </Route>
        </CustomRoutes>
        {permissions =>
            <>
                {permissions && permissions.includes(roles.PAGES_EDITOR) ?
                    <Resource name="pages" {...pages}/>
                : null}
                {permissions && permissions.includes(roles.MANAGER) ?
                    <Resource name="users" {...users}/>
                : null}
            </>
        }
    </App>
;
