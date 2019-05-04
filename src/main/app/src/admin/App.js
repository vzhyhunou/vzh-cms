import React, {Component} from 'react';
import {createAdminStore} from 'react-admin';
import DocumentTitle from 'react-document-title';
import createHistory from 'history/createBrowserHistory';
import {Provider} from 'react-redux';

import authProvider from './auth';
import {withTranslationUpdate} from '../commons/TranslationContext';
import restProvider from '../commons/rest';
import addUploadFeature from './upload';
import EditionProvider from './EditionContext';
import Main from './Main';

class App extends Component {

    shouldComponentUpdate(nextProps) {

        const {locale} = this.props;

        return locale === nextProps.locale;
    }

    render() {

        const {locale, translate, messages, getLocale, getMessages} = this.props;
        const dataProvider = addUploadFeature(restProvider(getLocale));
        const history = createHistory({basename: '/admin'});
        const i18nProvider = value => value === locale ? messages : getMessages(value);

        return <DocumentTitle title={translate('pos.title')}>
            <Provider
                store={createAdminStore({
                    authProvider,
                    dataProvider,
                    i18nProvider,
                    history,
                    locale
                })}
            >
                <EditionProvider>
                    <Main history={history}/>
                </EditionProvider>
            </Provider>
        </DocumentTitle>;
    }
}

export default withTranslationUpdate(App);
