import React, {memo} from 'react';
import {Admin, createAdminStore, Login} from 'react-admin';
import polyglotI18nProvider from 'ra-i18n-polyglot';
import {createMuiTheme} from '@material-ui/core/styles';
import {createBrowserHistory as createHistory} from 'history';
import {Provider} from 'react-redux';

import authProvider from '../commons/auth';
import {useTranslate, useGetMessages} from '../commons/TranslationContext';
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

const Area = ({getMessages, resources}) => {

    const dataProvider = addUploadFeature(restProvider());
    const history = createHistory({basename: '/admin'});

    return <Provider
        store={createAdminStore({
            authProvider,
            dataProvider,
            history
        })}
    >
        <Admin
            theme={theme}
            customRoutes={routes}
            menu={Menu}
            authProvider={authProvider}
            dataProvider={dataProvider}
            history={history}
            loginPage={() => <Login backgroundImage={background}/>}
            i18nProvider={polyglotI18nProvider(getMessages)}
        >
            {permissions => resources(permissions)}
        </Admin>
    </Provider>;
};

const EnhancedArea = memo(Area, () => true);

export default props => {

    const translate = useTranslate();
    const getMessages = useGetMessages();

    document.title = translate('pos.title');

    return <EnhancedArea
        getMessages={getMessages}
        {...props}
    />;
};
