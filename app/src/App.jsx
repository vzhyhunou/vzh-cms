import React from 'react';
import {Route, Navigate} from 'react-router-dom';
import {CustomRoutes, Resource} from 'react-admin';

import Layout from './commons/Layout';
import App from './commons/App';
import pages from './admin/pages';
import users from './admin/users';
import Page from './pages/App';
import context from './context';

export default () => {

    const {roles: {PAGES_EDITOR, MANAGER}} = context;

    return <App {...{context}}>
        <CustomRoutes noLayout>
            <Route path="/" element={<Navigate to="cms/pages/home"/>}/>
            <Route path="cms" element={<Layout/>}>
                <Route path="pages/:id" element={<Page/>}/>
            </Route>
        </CustomRoutes>
        {permissions =>
            <>
                {permissions && permissions.includes(PAGES_EDITOR) ?
                    <Resource name="pages" {...pages}/>
                : null}
                {permissions && permissions.includes(MANAGER) ?
                    <Resource name="users" {...users}/>
                : null}
            </>
        }
    </App>;
};
