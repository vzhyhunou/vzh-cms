import React, {memo, useEffect, useState, Fragment} from 'react';
import DocumentTitle from 'react-document-title';
import {withRouter} from 'react-router-dom';
import compose from 'recompose/compose';
import parse from 'html-react-parser';

import dataProvider, {GET_ONE_LOCALE} from '../commons/rest';
import {withTranslation} from '../commons/TranslationContext';

import './App.css';

const Area = ({locale, title, content}) =>
    <DocumentTitle title={title}>
        <Fragment>
            {parse(content, {
                replace: domNode => {
                    if (domNode.name === 'page') {
                        return <App locale={locale} id={domNode.attribs.id}/>;
                    }
                }
            })}
        </Fragment>
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

    return <EnhancedArea locale={locale} {...page}/>;
};

const ReducedApp = ({locale, match}) => <App locale={locale} id={match.params.id}/>;

export default compose(
    withRouter,
    withTranslation
)(ReducedApp);
