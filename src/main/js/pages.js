'use strict';

import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {Helmet} from 'react-helmet';
import {Layout} from './commons';
import client from "./client";

class Main extends Component {

    constructor(props) {
        super(props);
        const url = window.location.pathname;
        this.name = url.substring(url.lastIndexOf('/') + 1);
    }

    loadData(locale) {
        client({
            method: 'GET',
            path: '/api/pages/search/one/' + this.name + '?locale=' + locale
        }).then(item => {
            this.setState({
                page: item.entity
            });
        });
    }

    shouldComponentUpdate(nextProps) {
        if (this.props.locale === nextProps.locale)
            return true;
        this.loadData(nextProps.locale);
        return false;
    }

    componentWillMount() {
        this.loadData(this.props.locale);
    }

    render() {
        if (!this.state)
            return <div/>;
        return <div>
            <Helmet>
                <title>{this.state.page.properties[this.props.locale].title}</title>
            </Helmet>
            <div dangerouslySetInnerHTML={{__html: this.state.page.properties[this.props.locale].content}}/>
        </div>;
    }
}

ReactDOM.render(
    <Layout Main={Main}/>,
    document.getElementById('react')
);
