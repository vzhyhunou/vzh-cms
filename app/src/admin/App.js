import React, {memo} from 'react';
import {Admin, Login} from 'react-admin';
import polyglotI18nProvider from 'ra-i18n-polyglot';
import {createMuiTheme} from '@material-ui/core/styles';
import {createBrowserHistory as createHistory} from 'history';

import authProvider from '../commons/auth';
import {useTranslate, useGetMessages, useLocale} from '../commons/TranslationContext';
import restProvider from '../commons/rest';
import addUploadFeature from './upload';
import routes from './routes';
import Menu from './Menu';
import background from './background.png';

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

const Area = ({getMessages, locale, resources}) =>
    <Admin
        theme={theme}
        customRoutes={routes}
        menu={Menu}
        authProvider={authProvider}
        dataProvider={addUploadFeature(restProvider())}
        history={createHistory({basename: '/admin'})}
        loginPage={() => <Login backgroundImage={background}/>}
        i18nProvider={polyglotI18nProvider(getMessages, locale)}
    >
        {permissions => resources(permissions)}
    </Admin>
;

const EnhancedArea = memo(Area, () => true);

export default props => {

    const translate = useTranslate();
    const getMessages = useGetMessages();
    const locale = useLocale();

    document.title = translate('pos.title');

    return <EnhancedArea
        getMessages={getMessages}
        locale={locale}
        {...props}
    />;
};
