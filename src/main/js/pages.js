'use strict';

import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {Header} from './commons';

const client = require('./client');

const root = '/api/';

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {items: [], attributes: [], links: {}, requestSent: false};
        this.handleOnScroll = this.handleOnScroll.bind(this);
    }

    loadFromServer() {
        client({
            method: 'GET',
            path: root + this.props.rel
        }).then(collection => {
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
                items: collection.entity._embedded[this.props.rel],
                attributes: Object.keys(this.schema.properties),
                links: collection.entity._links
            });
            this.handleOnScroll();
        });
    }

    onNavigate(navUri) {
        client({
            method: 'GET',
            path: navUri
        }).then(collection => {
            this.setState({
                items: this.state.items.concat(collection.entity._embedded[this.props.rel]),
                links: collection.entity._links,
                requestSent: false
            });
            this.handleOnScroll();
        });
    }

    componentDidMount() {
        window.addEventListener('scroll', this.handleOnScroll);
        this.loadFromServer();
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleOnScroll);
    }

    handleOnScroll() {
        if (this.state.requestSent || window.innerHeight + window.scrollY < document.body.offsetHeight || !('next' in this.state.links))
            return;
        this.setState({
            requestSent: true
        });
        this.onNavigate(this.state.links.next.href);
    }

    render() {
        return (
            <div>
                <ItemList items={this.state.items}/>
                {(() => {
                    if (this.state.requestSent) {
                        return (
                            <div className="text-center">
                                <i className="fa fa-refresh fa-spin"></i>
                            </div>
                        );
                    }
                })()}
            </div>
        )
    }
}

class ItemList extends Component {

    render() {
        const items = this.props.items.map(item =>
            <Item key={item.id} item={item}/>
        );
        return (
            <table>
                <tbody>
                <tr>
                    <th>Id</th>
                    <th>Title</th>
                </tr>
                {items}
                </tbody>
            </table>
        )
    }
}

class Item extends Component {

    render() {
        return (
            <tr>
                <td>{this.props.item.id}</td>
                <td>{this.props.item.title}</td>
                {/*<td>{this.props.item.content}</td>
                <td dangerouslySetInnerHTML={{__html: this.props.item.content}}/>*/}
            </tr>
        )
    }
}

ReactDOM.render(
    <div>
        <Header title="Pages"/>
        <App rel={'pages'}/>
    </div>,
    document.getElementById('react')
);
