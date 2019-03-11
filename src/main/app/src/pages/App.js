import React, {Component} from 'react';
import {Helmet} from 'react-helmet';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {getLocale} from 'react-admin';
import compose from 'recompose/compose';

import Layout from '../commons/Layout';
import dataProvider, {GET_ONE_LOCALE} from '../commons/rest';
import './App.css';

class Main extends Component {

    dataProvider = dataProvider();

    loadData = () => {

        const {id} = this.props.match.params;

        this.dataProvider(GET_ONE_LOCALE, 'pages', {id}).then(response => {
            this.setState({page: response.data});
        })
    };

    shouldComponentUpdate(nextProps) {

        const {locale} = this.props;

        if (locale === nextProps.locale)
            return true;
        this.loadData();
        return false;
    }

    componentDidMount() {
        this.loadData();
    }

    render() {
        if (!this.state)
            return <div/>;

        const {locale} = this.props;
        const properties = this.state.page.properties[locale];

        return <div>
            <Helmet>
                <title>{properties.title}</title>
            </Helmet>
            <div dangerouslySetInnerHTML={{__html: properties.content}}/>
        </div>;
    }
}

const enhance = compose(
    withRouter,
    connect(
        state => ({
            locale: getLocale(state)
        }),
        {}
    )
);

export default () => <Layout Main={enhance(Main)}/>;
