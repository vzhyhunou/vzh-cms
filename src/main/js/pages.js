'use strict';

import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {Header} from './commons';

const client = require('./client');
const follow = require('./follow');

const root = '/api';

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {pages: [], attributes: [], links: {}};
    }

    loadFromServer() {
        follow(client, root, ['pages']).then(collection => {
            return client({
                method: 'GET',
                path: collection.entity._links.profile.href,
                headers: {'Accept': 'application/schema+json'}
            }).then(schema => {
                this.schema = schema.entity;
                return collection;
            });
        }).then(collection => {
            this.setState({
                pages: collection.entity._embedded.pages,
                attributes: Object.keys(this.schema.properties),
                links: collection.entity._links
            });
        });
    }

    componentDidMount() {
        this.loadFromServer();
    }

    render() {
        return (
            <div>
                <Header title="Pages"/>
                <PageList pages={this.state.pages}/>
            </div>
        )
    }
}

class PageList extends Component {
    render() {
        const pages = this.props.pages.map(page =>
            <Page key={page.id} page={page}/>
        );
        return (
            <table>
                <tbody>
                <tr>
                    <th>Id</th>
                    <th>Title</th>
                </tr>
                {pages}
                </tbody>
            </table>
        )
    }
}

class Page extends Component {
    render() {
        return (
            <tr>
                <td>{this.props.page.id}</td>
                <td>{this.props.page.title}</td>
                {/*<td>{this.props.page.content}</td>
                <td dangerouslySetInnerHTML={{__html: this.props.page.content}}/>*/}
            </tr>
        )
    }
}

ReactDOM.render(
    <App/>,
    document.getElementById('react')
);
