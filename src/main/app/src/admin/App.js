import React from 'react';
import {Admin, Login, Resource} from 'react-admin';
import {Helmet} from 'react-helmet';
import {createMuiTheme} from '@material-ui/core/styles';
import PageIcon from '@material-ui/icons/LibraryBooks';
import UserIcon from '@material-ui/icons/People';
import {connect} from 'react-redux';

import PageCreate from './pages/Create';
import PageEdit from './pages/Edit';
import PageList from './pages/List';
import UserCreate from './users/Create';
import UserEdit from './users/Edit';
import UserList from './users/List';
import routes from './routes';
import Menu from './Menu';
import {getMessages} from '../commons/locales';
import authProvider from './auth';
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

const App = ({messages, history}) => {

    const {title} = messages.pos;

    return <Admin
        theme={theme}
        title={title}
        customRoutes={routes}
        menu={Menu}
        authProvider={authProvider}
        history={history}
        loginPage={() => <Login backgroundImage={background}/>}
    >
        {permissions => [
            <Helmet>
                <title>{title}</title>
            </Helmet>,
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
    </Admin>;
};

export default connect(
    state => ({
        messages: getMessages(state)
    }),
    {}
)(App);
