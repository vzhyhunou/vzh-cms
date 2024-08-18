import React from 'react';
import { Layout } from 'react-admin';
import CssBaseline from '@mui/material/CssBaseline';

export default ({ children }) =>
    <Layout>
        <CssBaseline/>
        {children}
    </Layout>
;
