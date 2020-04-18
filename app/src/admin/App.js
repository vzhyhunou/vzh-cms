import React, {memo} from 'react';
import {Admin, createAdminStore, Login} from 'react-admin';
import {createMuiTheme} from '@material-ui/core/styles';
import createHistory from 'history/createBrowserHistory';
import {Provider} from 'react-redux';

import authProvider from '../commons/auth';
import {withTranslation} from '../commons/TranslationContext';
import restProvider from '../commons/rest';
import addUploadFeature from './upload';
import EditionProvider from './EditionContext';
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

const App = ({locale, translate, getMessages, resources}) => {

    const dataProvider = addUploadFeature(restProvider());
    const history = createHistory({basename: '/admin'});

    document.title = translate('pos.title');

    return <Provider
        store={createAdminStore({
            authProvider,
            dataProvider,
            i18nProvider: getMessages,
            history,
            locale
        })}
    >
        <EditionProvider>
            <Admin
                theme={theme}
                customRoutes={routes}
                menu={Menu}
                authProvider={authProvider}
                history={history}
                loginPage={() => <Login backgroundImage={background}/>}
            >
                {permissions => resources(permissions)}
            </Admin>
        </EditionProvider>
    </Provider>;
};

export default withTranslation(memo(App, () => true));
