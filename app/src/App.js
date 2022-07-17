import React from 'react';
import {Route, Navigate} from 'react-router-dom';
import {CustomRoutes, Resource} from 'react-admin';

import Layout from './commons/Layout';
import {App} from './commons';
import {pages, users} from './admin';
import {PageComponent} from './pages';

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

export default ({history}) => {

    const {
        EDITOR,
        MANAGER
    } = roles;

    return <App
        {...{locales, components, history, roles}}
        i18n={locale => import(`./commons/i18n/${locale}`)}
    >
        <CustomRoutes>
            <Route exact path="/" element={<Navigate to="cms/pages/home"/>}/>
        </CustomRoutes>
        <CustomRoutes noLayout>
            <Route path="/cms/*" element={<Layout/>}/>
        </CustomRoutes>
        {permissions =>
            <>
                {permissions && permissions.includes(EDITOR) ?
                    <Resource name="pages" {...pages}/>
                : null}
                {permissions && permissions.includes(MANAGER) ?
                    <Resource name="users" {...users}/>
                : null}
            </>
        }
    </App>;
};
