'use strict';

import React, {Component} from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import filterFactory from 'react-bootstrap-table2-filter';
import cookie from 'react-cookies';
import client from './client';
import locales from './locales';

const root = '/api/';

export class Layout extends Component {

    constructor(props) {
        super(props);
        this.loadMessages = this.loadMessages.bind(this);
    }

    loadMessages(locale) {
        client({
            method: 'GET',
            path: '/static/assets/' + locale + '.json'
        }).then(m => {
            this.setState({
                locale: locale,
                messages: m.entity
            });
        });
    }

    componentWillMount() {
        this.loadMessages(cookie.load('locale') || 'en');
    }

    render() {
        if (!this.state)
            return <div/>;
        const {Main} = this.props;
        return <div>
            <nav className="navbar navbar-inverse navbar-fixed-top">
                <div className="navbar-header">
                    <button type="button" data-target="#navbar" data-toggle="collapse" className="navbar-toggle">
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                    </button>
                    <a href="/" className="navbar-brand" title={this.state.messages.homePage}><span className="fa fa-home" aria-hidden="true"></span> Project</a>
                </div>
                <div id="navbar" className="collapse navbar-collapse">
                    <Locale locale={this.state.locale} messages={this.state.messages} loadMessages={this.loadMessages}/>
                </div>
            </nav>
            <Main locale={this.state.locale}/>
        </div>;
    }
}

class Locale extends Component {

    constructor(props) {
        super(props);
        this.handleLocaleChange = this.handleLocaleChange.bind(this);
    }

    handleLocaleChange(locale) {
        cookie.save('locale', locale, {path: '/'});
        this.props.loadMessages(locale);
    }

    render() {
        return <ul className="nav navbar-nav navbar-right">
            <li className="dropdown">
                <a data-toggle="dropdown" className="dropdown-toggle" href="#">{this.props.messages.locale} <b className="caret"></b></a>
                <ul className="dropdown-menu">
                    {(() => {
                        return locales.filter(l => l.val !== this.props.locale).map(l =>
                            <li key={l.val}>
                                <a href="#" onClick={() => this.handleLocaleChange(l.val)}>{l.name}</a>
                            </li>
                        );
                    })()}
                </ul>
            </li>
        </ul>;
    }
}

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

    componentDidMount() {
        window.addEventListener('scroll', this.handleOnScroll);
        this.loadData(this.props.locale);
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
                            striped hover condensed/>
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