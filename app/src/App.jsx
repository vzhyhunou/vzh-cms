import React from 'react';
import {Route, Navigate} from 'react-router-dom';
import {CustomRoutes, Resource} from 'react-admin';

import Layout from './commons/Layout';
import {App} from './commons';
import {pages, users} from './admin';
import {Page} from './pages';
import context from './context';

export default () =>
    <App {...{context}}>
        <CustomRoutes noLayout>
            <Route path="/" element={<Navigate to="cms/pages/home"/>}/>
            <Route path="cms" element={<Layout/>}>
                <Route path="pages/:id" element={<Page/>}/>
            </Route>
        </CustomRoutes>
        {permissions =>
            <>
                {permissions && permissions.includes(context.roles.PAGES_EDITOR) ?
                    <Resource name="pages" {...pages}/>
                : null}
                {permissions && permissions.includes(context.roles.MANAGER) ?
                    <Resource name="users" {...users}/>
                : null}
            </>
        }
    </App>
;
