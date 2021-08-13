import React, {cloneElement} from 'react';
import {AdminContext, AdminUI, usePermissions} from 'react-admin';
import polyglotI18nProvider from 'ra-i18n-polyglot';
import {createMuiTheme} from '@material-ui/core/styles';

import authProvider from './auth';
import Layout from './Layout';
import {useGetLocale, useGetMessages} from '../commons/AppContext';

const theme = createMuiTheme({
    palette: {
        secondary: {
            light: '#5f5fc4',
            main: '#283593',
            dark: '#001064',
            contrastText: '#fff'
        }
    }
});

const Resources = ({routes, resources}) => {

    const {permissions} = usePermissions();

    return <AdminUI
        {...{theme}}
        customRoutes={routes}
        layout={Layout}
    >
        {resources(permissions).map((resource, key) => cloneElement(resource, {key}))}
    </AdminUI>;
};

export default ({routes, resources, history, data}) => {

    const getLocale = useGetLocale();
    const getMessages = useGetMessages();

    return <AdminContext
        {...{authProvider, history}}
        dataProvider={data(getLocale)}
        i18nProvider={polyglotI18nProvider(getMessages, getLocale())}
    >
        <Resources
            {...{routes, resources}}
        />
    </AdminContext>;
};
