'use strict';

import React, {Component} from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import filterFactory from 'react-bootstrap-table2-filter';
import client from './client';

const root = '/api/';

export class Table extends Component {

    constructor(props) {
        super(props);
        this.state = {data: [], attributes: [], links: {}, requestSent: false};
        this.handleOnScroll = this.handleOnScroll.bind(this);
        this.handleTableChange = this.handleTableChange.bind(this);
    }

    loadData(locale) {
        client({
            method: 'GET',
            path: root + this.props.rel + '/search/filter?locale=' + locale
        }).then(collection => {
            return client({
                method: 'GET',
                path: root + 'profile/' + this.props.rel,
                headers: {'Accept': 'application/schema+json'}
            }).then(schema => {
                this.schema = schema.entity;
                return collection;
            });
        }).then(collection => {
            this.setState({
                data: collection.entity._embedded[this.props.rel],
                attributes: Object.keys(this.schema.properties),
                links: collection.entity._links
            });
            this.handleOnScroll();
        });
    }

    updateData(locale) {
        client({
            method: 'GET',
            path: root + this.props.rel + '/search/filter?locale=' + locale
        }).then(collection => {
            this.setState({
                data: collection.entity._embedded[this.props.rel],
                links: collection.entity._links
            });
            this.handleOnScroll();
        });
    }

    shouldComponentUpdate(nextProps) {
        if (this.props.locale === nextProps.locale)
            return true;
        this.updateData(nextProps.locale);
        return false;
    }

    onNavigate(navUri) {
        client({
            method: 'GET',
            path: navUri
        }).then(collection => {
            this.setState({
                data: this.state.data.concat(collection.entity._embedded[this.props.rel]),
                links: collection.entity._links,
                requestSent: false
            });
            this.handleOnScroll();
        });
    }

    componentWillMount() {
        this.loadData(this.props.locale);
    }

    componentDidMount() {
        window.addEventListener('scroll', this.handleOnScroll);
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleOnScroll);
    }

    handleOnScroll() {
        if (this.state.requestSent
            || window.innerHeight + window.scrollY < document.body.offsetHeight
            || !('next' in this.state.links))
            return;
        this.setState({
            requestSent: true
        });
        this.onNavigate(this.state.links.next.href);
    }

    handleTableChange(type, {sortField, sortOrder, filters}) {
        const f = Object.keys(filters).map(k => k + '=' + filters[k].filterVal).join('&');
        const s = sortField ? 'sort=' + sortField + ',' + sortOrder : '';
        client({
            method: 'GET',
            path: root + this.props.rel + '/search/filter?locale=' + this.props.locale + (f ? '&' + f : '') + (s ? '&' + s : '')
        }).then(collection => {
            this.setState({
                data: collection.entity._embedded[this.props.rel],
                links: collection.entity._links
            });
            this.handleOnScroll();
        });
    }

    render() {
        return <div>
            <BootstrapTable remote={{sort: true, filter: true}} keyField='id' data={this.state.data}
                            columns={this.props.columns} filter={filterFactory()} onTableChange={this.handleTableChange}
                            striped hover condensed
                            caption={<h4><span className="fa fa-list" aria-hidden="true"></span> {this.props.messages.pages.manager}</h4>}
            />
            {(() => {
                if (this.state.requestSent) {
                    return <div className="text-center">
                        <i className="fa fa-refresh fa-spin"/>
                    </div>;
                }
            })()}
        </div>;
    }
}