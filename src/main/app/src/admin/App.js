import React from 'react';
import {Admin, Login, Resource, translate} from 'react-admin';
import {Helmet} from 'react-helmet';
import {createMuiTheme} from '@material-ui/core/styles';
import PageIcon from '@material-ui/icons/LibraryBooks';
import UserIcon from '@material-ui/icons/People';

import PageCreate from './pages/Create';
import PageEdit from './pages/Edit';
import PageList from './pages/List';
import UserCreate from './users/Create';
import UserEdit from './users/Edit';
import UserList from './users/List';
import routes from './routes';
import Menu from './Menu';
import authProvider from './auth';
import background from './background.png';
import EditionProvider from './EditionContext';

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

const App = ({history, translate}) =>
    <EditionProvider>
        <Helmet>
            <title>{translate('pos.title')}</title>
        </Helmet>
        <Admin
            theme={theme}
            customRoutes={routes}
            menu={Menu}
            authProvider={authProvider}
            history={history}
            loginPage={() => <Login backgroundImage={background}/>}
        >
            {permissions => [
                permissions.includes('ROLE_EDITOR')
                    ? <Resource
                        name="pages"
                        list={PageList}
                        edit={PageEdit}
                        create={PageCreate}
                        icon={PageIcon}
                    />
                    : null,
                permissions.includes('ROLE_MANAGER')
                    ? <Resource
                        name="users"
                        list={UserList}
                        edit={UserEdit}
                        create={UserCreate}
                        icon={UserIcon}
                    />
                    : null
            ]}
        </Admin>
    </EditionProvider>
;

export default translate(App);
