import React, {Component} from 'react';
import {BrowserRouter, Redirect, Route} from 'react-router-dom';
import {Provider} from 'react-redux';
import createHistory from 'history/createHashHistory';

import createAdminStore from './admin/createAdminStore';
import restProvider from './commons/rest';
import addUploadFeature from './admin/upload';
import {i18nLoader, i18nProvider} from './commons/locales';
import cmsReducer from './admin/reducer';
import AdminApp from './admin/App';
import PagesApp from './pages/App';

export default class extends Component {

    componentWillMount() {
        i18nLoader().then(state => this.setState(state));
    }

    render() {
        if (!this.state)
            return <div/>;

        const dataProvider = addUploadFeature(restProvider('/api'));
        const history = createHistory();
        const customReducers = {cms: cmsReducer};
        const {locale} = this.state;

        return <Provider
            store={createAdminStore({
                dataProvider,
                i18nProvider,
                customReducers,
                history,
                locale
            })}
        >
            <BrowserRouter>
                <div>
                    <Route path="/pages" component={PagesApp}/>
                    <Route path="/admin" render={() => <AdminApp history={history}/>}/>
                    <Route exact path="/" render={() => <Redirect to={{pathname: 'pages/home'}}/>}/>
                </div>
            </BrowserRouter>
        </Provider>;
    }
};