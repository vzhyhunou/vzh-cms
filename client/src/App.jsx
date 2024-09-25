import React from 'react';
import { Route } from 'react-router-dom';

import { Core, Page, PageComponent } from '.';
import { pages, users } from '.';
import Layout from './cms/Layout';

export default ({config}) => {

    const {resources: {users: {tags: {PAGES_EDITOR, MANAGER}}}} = config;
    const resources = {
        [PAGES_EDITOR]: {pages},
        [MANAGER]: {users}
    };

    return <Core {...{config, resources}}>
        <Route element={<Layout/>}>
            <Route path="" element={<PageComponent id="home" external/>}/>
            <Route path=":id" element={<Page/>}/>
            <Route path="*" element={<PageComponent id="none" external/>}/>
        </Route>
    </Core>;
};