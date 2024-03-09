import React from 'react';
import {Route, Navigate} from 'react-router-dom';
import {CustomRoutes, Resource} from 'react-admin';

import App, {pages, users, Page} from '.';
import Layout from './cms/Layout';
import config from './config';

export default () => {

    const {tags: {users: {PAGES_EDITOR, MANAGER}}} = config;

    return <App {...{config}}>
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
