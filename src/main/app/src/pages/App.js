import React, {Component} from 'react';
import {Helmet} from 'react-helmet';

import Layout from '../commons/Layout';
import dataProvider, {GET_ONE_LOCALE} from '../commons/rest';

class Main extends Component {

    dataProvider = dataProvider('/api');

    loadData = () => {

        const {path} = this.props;

        this.dataProvider(GET_ONE_LOCALE, 'pages', {id: path}).then(response => {
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

    componentWillMount() {
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

export default () => <Layout Main={Main}/>;
