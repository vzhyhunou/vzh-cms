import React from 'react';
import { Route } from 'react-router-dom';
import { CustomRoutes } from 'react-admin';

import {AdminLayout, Core, Page, PageComponent} from '.';
import resources from './resources';
import Layout from './cms/Layout';

const {pages, users} = resources;

export default ({config}) => {

    const {resources: {users: {tags: {PAGES_EDITOR, MANAGER}}}} = config;

    return <Core {...{config}} basename="/admin">
        <CustomRoutes noLayout>
            <Route path="admin">
                <Route path="" element={<AdminLayout/>}/>
                {Object.entries(resources).map(([k, v]) => <Route key={k} path={`${k}/*`} element={<AdminLayout>{v}</AdminLayout>}/>)}
            </Route>
            <Route element={<Layout/>}>
                <Route path="" element={<PageComponent id="home" external/>}/>
                <Route path=":id" element={<Page/>}/>
            </Route>
        </CustomRoutes>
        {permissions => permissions &&
            <>
                {permissions.includes(PAGES_EDITOR) && pages}
                {permissions.includes(MANAGER) && users}
            </>
        }
    </Core>;
};