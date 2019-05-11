import React, {memo} from 'react';
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

const App = ({locale, translate, messages, getLocale, getMessages}) => {

    const dataProvider = addUploadFeature(restProvider(getLocale));
    const history = createHistory({basename: '/admin'});

    return <DocumentTitle title={translate('pos.title')}>
        <Provider
            store={createAdminStore({
                authProvider,
                dataProvider,
                i18nProvider: getMessages,
                history,
                locale
            })}
        >
            <EditionProvider>
                <Main history={history}/>
            </EditionProvider>
        </Provider>
    </DocumentTitle>;
};

export default withTranslationUpdate(memo(App, () => true));
