'use strict';

import React, {Component} from 'react';
import cookie from 'react-cookies';
import client from './client';
import locales from './locales';

export class Layout extends Component {

    constructor(props) {
        super(props);
        const url = window.location.pathname;
        this.path = url.split('/').slice(1);
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
                    <a href="/" className="navbar-brand" title={this.state.messages.pages.home}><span className="fa fa-home" aria-hidden="true"></span> Project</a>
                </div>
                <div id="navbar" className="collapse navbar-collapse">
                    <div className="navbar-form navbar-right">
                        {(() => {
                            if (this.path[0] !== 'pages-manage') {
                                return <a className="btn btn-primary" href="/pages-manage" title={this.state.messages.pages.manager}>
                                    <span className="fa fa-list" aria-hidden="true"></span>
                                </a>;
                            }
                        })()}
                    </div>
                    <Locale locale={this.state.locale} messages={this.state.messages} loadMessages={this.loadMessages}/>
                </div>
            </nav>
            <Main locale={this.state.locale} messages={this.state.messages} path={this.path.slice(1)}/>
        </div>;
    }
}

class Locale extends Component {

    constructor(props) {
        super(props);
        this.handleLocaleChange = this.handleLocaleChange.bind(this);
    }

    handleLocaleChange(e, locale) {
        e.preventDefault();
        cookie.save('locale', locale, {path: '/'});
        this.props.loadMessages(locale);
    }

    render() {
        return <ul className="nav navbar-nav navbar-right">
            <li className="dropdown">
                <a data-toggle="dropdown" className="dropdown-toggle" href="#">{this.props.messages.locale} <b className="caret"></b></a>
                <ul className="dropdown-menu">
                    {Object.keys(locales).filter(l => l !== this.props.locale).map(l =>
                        <li key={l}>
                            <a href="#" onClick={(e) => this.handleLocaleChange(e, l)}>{locales[l]}</a>
                        </li>
                    )}
                </ul>
            </li>
        </ul>;
    }
}
