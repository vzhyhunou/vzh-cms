import React from 'react';
import { Admin, Login, Layout as AdminLayout } from 'react-admin';
import polyglotI18nProvider from 'ra-i18n-polyglot';
import { createMuiTheme } from '@material-ui/core/styles';

import authProvider, { getToken } from './auth';
import restProvider from './rest';
import addUploadFeature from './upload';
import Menu from './Menu';
import background from './background.png';
import { useGetLocale, useGetMessages } from '../commons/AppContext';
import routes from './routes';

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

export default ({layout, resources, history}) => {

    const getLocale = useGetLocale();
    const getMessages = useGetMessages();

    return <Admin
        theme={theme}
        customRoutes={routes(layout)}
        layout={props => <AdminLayout {...props} menu={Menu}/>}
        authProvider={authProvider}
        dataProvider={addUploadFeature(restProvider(getLocale, getToken))}
        history={history}
        loginPage={() => <Login backgroundImage={background}/>}
        i18nProvider={polyglotI18nProvider(getMessages, getLocale())}
    >
        {permissions => resources(permissions)}
    </Admin>
};
