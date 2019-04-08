import React, {Component} from 'react';
import {Helmet} from 'react-helmet';
import {withRouter} from 'react-router-dom';
import compose from 'recompose/compose';

import dataProvider, {GET_ONE_LOCALE} from '../commons/rest';
import './App.css';
import {withTranslation} from '../commons/TranslationContext';

class App extends Component {

    loadData = locale => {

        const {id} = this.props.match.params;

        dataProvider(locale)(GET_ONE_LOCALE, 'pages', {id}).then(response => {
            this.setState({page: response.data});
        })
    };

    shouldComponentUpdate(nextProps) {

        const {locale} = this.props;

        if (locale === nextProps.locale)
            return true;

        this.loadData(nextProps.locale);
        return false;
    }

    componentDidMount() {

        const {locale} = this.props;

        this.loadData(locale);
    }

    render() {
        if (!this.state)
            return <div/>;

        const {locale} = this.props;
        const {title, content} = this.state.page.properties[locale];

        return <div>
            <Helmet>
                <title>{title}</title>
            </Helmet>
            <div dangerouslySetInnerHTML={{__html: content}}/>
        </div>;
    }
}

export default compose(
    withRouter,
    withTranslation
)(App);
