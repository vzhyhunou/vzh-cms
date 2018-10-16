import React, {Component} from 'react';
import {Admin, Resource} from 'react-admin';
import {Helmet} from 'react-helmet';
import PageIcon from '@material-ui/icons/Collections';
import UserIcon from '@material-ui/icons/Person';
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

class App extends Component {

    render() {

        const {messages, history} = this.props;
        const {title} = messages.pos;

        return <Admin
            title={title}
            customRoutes={routes}
            menu={Menu}
            history={history}
        >
            <Helmet>
                <title>{title}</title>
            </Helmet>
            <Resource
                name="pages"
                list={PageList}
                edit={PageEdit}
                create={PageCreate}
                icon={PageIcon}
            />
            <Resource
                name="users"
                list={UserList}
                edit={UserEdit}
                create={UserCreate}
                icon={UserIcon}
            />
        </Admin>;
    }
}

export default connect(
    state => ({
        messages: getMessages(state)
    }),
    {}
)(App);
