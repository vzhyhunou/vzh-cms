import React from 'react';
import {Admin, Login} from 'react-admin';
import polyglotI18nProvider from 'ra-i18n-polyglot';
import {createMuiTheme} from '@material-ui/core/styles';

import authProvider from '../commons/auth';
import restProvider from '../commons/rest';
import addUploadFeature from './upload';
import Menu from './Menu';
import background from './background.png';
import {useGetLocale, useGetMessages} from '../commons/TranslationContext';

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

export default ({routes, resources, history}) => {

    const getLocale = useGetLocale();
    const getMessages = useGetMessages();

    return <Admin
        theme={theme}
        customRoutes={routes}
        menu={Menu}
        authProvider={authProvider}
        dataProvider={addUploadFeature(restProvider())}
        history={history}
        loginPage={() => <Login backgroundImage={background}/>}
        i18nProvider={polyglotI18nProvider(getMessages, getLocale())}
    >
        {permissions => resources(permissions)}
    </Admin>
};
