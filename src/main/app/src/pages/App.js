import React, {memo, useEffect, useState} from 'react';
import DocumentTitle from 'react-document-title';
import {withRouter} from 'react-router-dom';
import compose from 'recompose/compose';

import dataProvider, {GET_ONE_LOCALE} from '../commons/rest';
import {withTranslation} from '../commons/TranslationContext';

import './App.css';

const Page = memo(({page}) => {

    const {title, content} = page.properties[Object.keys(page.properties)[0]];

    return <DocumentTitle title={title}>
        <div dangerouslySetInnerHTML={{__html: content}}/>
    </DocumentTitle>;
});

const App = ({locale, match}) => {

    const [page, setPage] = useState();

    useEffect(() => {

        const {id} = match.params;

        dataProvider(locale)(GET_ONE_LOCALE, 'pages', {id}).then(response => setPage(response.data));
    }, locale);

    if (!page)
        return <div/>;

    return <Page page={page}/>;
};

export default compose(
    withRouter,
    withTranslation
)(App);
