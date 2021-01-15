import React from 'react';
import {Admin, Layout} from 'react-admin';
import polyglotI18nProvider from 'ra-i18n-polyglot';
import {createMuiTheme} from '@material-ui/core/styles';

import authProvider from './auth';
import Menu from './Menu';
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

export default ({routes, resources, history, data}) => {

    const getLocale = useGetLocale();
    const getMessages = useGetMessages();

    return <Admin
        {...{theme, authProvider, history}}
        customRoutes={routes}
        layout={props => <Layout {...props} menu={Menu}/>}
        dataProvider={data(getLocale)}
        i18nProvider={polyglotI18nProvider(getMessages, getLocale())}
    >
        {permissions => resources(permissions)}
    </Admin>
};
