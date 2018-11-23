import React, {Component} from 'react';
import {Admin, Login, Resource} from 'react-admin';
import {Helmet} from 'react-helmet';
import PageIcon from '@material-ui/icons/Collections';
import UserIcon from '@material-ui/icons/Person';
import {withStyles} from '@material-ui/core/styles';
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

const styles = theme => ({
    main: {
        background: 'none',
        backgroundColor: theme.palette.primary.main
    }
});

class App extends Component {

    render() {

        const {messages, history} = this.props;
        const {title} = messages.pos;

        return <Admin
            title={title}
            customRoutes={routes}
            menu={Menu}
            authProvider={authProvider}
            history={history}
            loginPage={withStyles(styles)(Login)}
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
    }
}

export default connect(
    state => ({
        messages: getMessages(state)
    }),
    {}
)(App);
