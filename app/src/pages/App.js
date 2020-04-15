import React, {memo, useEffect, useState} from 'react';
import DocumentTitle from 'react-document-title';
import {withRouter} from 'react-router-dom';
import compose from 'recompose/compose';

import dataProvider, {GET_ONE_LOCALE} from '../commons/rest';
import {withTranslation} from '../commons/TranslationContext';

import './App.css';

const Area = ({title, content}) =>
    <DocumentTitle title={title}>
        <div dangerouslySetInnerHTML={{__html: content}}/>
    </DocumentTitle>
;

const EnhancedArea = memo(Area);

const App = ({locale, id}) => {

    const [page, setPage] = useState();

    useEffect(() => {

        dataProvider()(GET_ONE_LOCALE, 'pages', {id}).then(response => {

            const {data} = response;

            if (data) {
                setPage(data);
                return;
            }

            dataProvider()(GET_ONE_LOCALE, 'pages', {id: 'none'}).then(response => setPage(response.data));
        });
    }, [locale, id]);

    if (!page)
        return <div/>;

    return <EnhancedArea {...page}/>;
};

const ReducedApp = ({locale, match}) => <App locale={locale} id={match.params.id}/>;

export default compose(
    withRouter,
    withTranslation
)(ReducedApp);
