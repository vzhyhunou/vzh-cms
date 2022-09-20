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
    EDITOR: 'EDITOR'
};

const locales = {
    en: 'English',
    ru: 'Русский'
};

const components = {
    Page: PageComponent
};

export default () =>
    <App
        {...{locales, components, roles}}
        i18n={locale => import(`./commons/i18n/${locale}`)}
    >
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
                {permissions && permissions.includes(roles.EDITOR) ?
                    <Resource name="pages" {...pages}/>
                : null}
                {permissions && permissions.includes(roles.MANAGER) ?
                    <Resource name="users" {...users}/>
                : null}
            </>
        }
    </App>
;
