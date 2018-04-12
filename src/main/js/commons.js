'use strict';

import React, {Component} from 'react';
import {Helmet} from 'react-helmet';

const client = require('./client');

const root = '/api/';

export class Header extends Component {

    render() {
        return <nav>
            <Helmet>
                <title>{this.props.title}</title>
            </Helmet>
        </nav>
    }
}

export class Loader extends Component {

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
        const {List} = this.props;
        return <div>
            <List items={this.state.items}/>
            {(() => {
                if (this.state.requestSent) {
                    return <div className="text-center">
                        <i className="fa fa-refresh fa-spin"></i>
                    </div>;
                }
            })()}
        </div>
    }
}