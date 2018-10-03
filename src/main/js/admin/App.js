import React, {Component} from 'react';
import {Admin, Resource} from 'react-admin';
import {Helmet} from 'react-helmet';
import PageIcon from '@material-ui/icons/Collections';
import UserIcon from '@material-ui/icons/Person';

import dataProvider from '../commons/rest';
import addUploadFeature from './upload';
import PageCreate from './pages/Create';
import PageEdit from './pages/Edit';
import PageList from './pages/List';
import UserEdit from './users/Edit';
import UserList from './users/List';
import routes from './routes';
import Menu from './Menu';
import {i18nLoader, i18nProvider} from '../commons/locales';
import cmsReducer from './reducer';

export default class extends Component {

    componentWillMount() {
        i18nLoader().then(state => this.setState(state));
    }

    render() {
        if (!this.state)
            return <div/>;

        const {locale, messages} = this.state;
        const title = messages.pos.title;

        return <Admin
            title={title}
            locale={locale}
            customRoutes={routes}
            menu={Menu}
            dataProvider={addUploadFeature(dataProvider('/api'))}
            i18nProvider={i18nProvider}
            customReducers={{cms: cmsReducer}}
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
                icon={UserIcon}
            />
        </Admin>;
    }
};
