import React from 'react';
import {Admin, Login} from 'react-admin';
import polyglotI18nProvider from 'ra-i18n-polyglot';
import {createMuiTheme} from '@material-ui/core/styles';

import authProvider from '../commons/auth';
import addUploadFeature from './upload';
import Menu from './Menu';
import background from './background.png';
import {useLocale, useGetMessages, useDataProvider} from '../commons/AppContext';

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

    const locale = useLocale();
    const getMessages = useGetMessages();
    const dataProvider = useDataProvider();

    return <Admin
        theme={theme}
        customRoutes={routes}
        menu={Menu}
        authProvider={authProvider}
        dataProvider={addUploadFeature(dataProvider)}
        history={history}
        loginPage={() => <Login backgroundImage={background}/>}
        i18nProvider={polyglotI18nProvider(getMessages, locale)}
    >
        {permissions => resources(permissions)}
    </Admin>
};
