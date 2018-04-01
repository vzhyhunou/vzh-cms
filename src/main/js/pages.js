'use strict';

import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {Header} from './commons';

const client = require('./client');

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {pages: []};
    }

    componentDidMount() {
        client({method: 'GET', path: '/api/pages'}).then(response => {
            this.setState({pages: response.entity._embedded.pages});
        });
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
