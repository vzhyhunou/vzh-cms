'use strict';

import React, {Component} from 'react';
import cookie from 'react-cookies';
import axios from 'axios';

export const locales = {
    "en": "English",
    "ru": "Русский"
};

export class Layout extends Component {

    constructor(props) {
        super(props);
        const url = window.location.pathname;
        this.path = url.split('/').slice(1);
        this.loadMessages = this.loadMessages.bind(this);
    }

    loadMessages(locale) {
        axios.get('/static/assets/' + locale + '.json').then(response => {
            this.setState({
                locale: locale,
                messages: response.data
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
        var messages = this.state.messages;
        return <div>
            <nav className="navbar navbar-inverse navbar-fixed-top">
                <div className="navbar-header">
                    <button type="button" data-target="#navbar" data-toggle="collapse" className="navbar-toggle">
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                    </button>
                    <a href="/" className="navbar-brand" title={messages.pages.home}><span className="fa fa-home" aria-hidden="true"></span> Project</a>
                </div>
                <div id="navbar" className="collapse navbar-collapse">
                    <div className="navbar-form navbar-right">
                        <a className="btn btn-primary" href="/admin" title={messages.pages.manager}>
                            <span className="fa fa-list" aria-hidden="true"></span>
                        </a>
                        <a className="btn btn-primary" href={'/admin#/pages/' + this.path[1]} title={messages.pages.editor}>
                            <span className="fa fa-edit" aria-hidden="true"></span>
                        </a>
                    </div>
                    <Locale locale={this.state.locale} messages={messages} loadMessages={this.loadMessages}/>
                </div>
            </nav>
            <Main locale={this.state.locale} messages={messages} path={this.path.slice(1)}/>
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
                <a data-toggle="dropdown" className="dropdown-toggle" href="#">{this.props.locale} <b className="caret"></b></a>
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

export const Modal = (props) => (
    <div className="modal fade" role="dialog" aria-labelledby="actionModalLabel" id="actionModal">
        <div className="modal-dialog modal-sm">
            <div className="modal-content">
                <div className="modal-header">
                    <button type="button" className="close" data-dismiss="modal">
                        <span aria-hidden="true">&times;</span>
                    </button>
                    <h4 className="modal-title" id="actionModalLabel">{props.messageAction}</h4>
                </div>
                <div className="modal-body">
                    <p>{props.messageAction + ' ' + props.item + '?'}</p>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-default" data-dismiss="modal">{props.messages.cancel}</button>
                    <button type="button" className="btn btn-danger" data-dismiss="modal" onClick={props.action}>{props.messageAction}</button>
                </div>
            </div>
        </div>
    </div>
);
