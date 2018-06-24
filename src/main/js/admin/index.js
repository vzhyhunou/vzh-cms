'use strict';

import React, {Component} from 'react';
import {Admin, Resource} from 'react-admin';
import {Helmet} from 'react-helmet';
import dataProvider from './rest';
import {PageList, PageEdit} from './pages';
import routes from './routes';
import Menu from './menu';
import {i18nLoader, i18nProvider} from '../commons/locale';

export default class extends Component {

    componentWillMount() {
        i18nLoader((state) => this.setState(state));
    }

    render() {
        if (!this.state)
            return <div/>;

        const {locale, messages} = this.state;

        return <Admin
            title={messages.pos.title}
            locale={locale}
            customRoutes={routes}
            menu={Menu}
            dataProvider={dataProvider('/api')}
            i18nProvider={i18nProvider}
        >
            <Helmet>
                <title>{messages.pos.title}</title>
            </Helmet>
            <Resource
                name="pages"
                list={PageList}
                edit={PageEdit}
            />
        </Admin>;
    }
};
