'use strict';

import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {Helmet} from 'react-helmet';
import {Layout} from './commons';
import client from "./client";

class Main extends Component {

    constructor(props) {
        super(props);
    }

    loadData(locale) {
        client.get('pages/search/one/' + this.props.path + '?locale=' + locale).then(response => {
            this.setState({
                page: response.data
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
        var page = this.state.page;
        return <div>
            <Helmet>
                <title>{page.properties[this.props.locale].title}</title>
            </Helmet>
            <div dangerouslySetInnerHTML={{__html: page.properties[this.props.locale].content}}/>
        </div>;
    }
}

ReactDOM.render(
    <Layout Main={Main}/>,
    document.getElementById('react')
);
