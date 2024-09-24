import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { CustomRoutes } from 'react-admin';

import {AdminLayout, Core, Page, PageComponent} from '.';
import resources from './resources';
import Layout from './cms/Layout';

const {pages, users} = resources;

export default ({config}) => {

    const {resources: {users: {tags: {PAGES_EDITOR, MANAGER}}}} = config;

    return <Core {...{config}} basename="/admin">
        {permissions =>
            <>
                <CustomRoutes noLayout>
                    <Route path="admin">
                        {permissions ?
                            <>
                                <Route path="" element={<AdminLayout/>}/>
                                {permissions.includes(PAGES_EDITOR) && <Route path="pages/*" element={<AdminLayout>{pages}</AdminLayout>}/>}
                                {permissions.includes(MANAGER) && <Route path="users/*" element={<AdminLayout>{users}</AdminLayout>}/>}
                            </>
                            :
                            <Route path="*?" element={<Navigate to="/login"/>}/>
                        }
                    </Route>
                    <Route element={<Layout/>}>
                        <Route path="" element={<PageComponent id="home" external/>}/>
                        <Route path=":id" element={<Page/>}/>
                    </Route>
                </CustomRoutes>
                {permissions &&
                    <>
                        {permissions.includes(PAGES_EDITOR) && pages}
                        {permissions.includes(MANAGER) && users}
                    </>
                }
            </>
        }
    </Core>;
};