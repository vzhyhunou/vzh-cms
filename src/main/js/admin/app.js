import React, {Component} from 'react';
import {Admin, Resource} from 'react-admin';
import {Helmet} from 'react-helmet';

import dataProvider from '../commons/rest';
import addUploadFeature from './upload';
import PageCreate from './pages/create';
import PageEdit from './pages/edit';
import PageList from './pages/list';
import routes from './routes';
import Menu from './menu';
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
            />
        </Admin>;
    }
};
