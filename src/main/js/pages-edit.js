'use strict';

import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {Helmet} from 'react-helmet';
import AceEditor from 'react-ace';
import 'brace/mode/html';
import 'brace/theme/textmate';
import {Layout, locales, Modal} from './commons';
import client from "./client";

class Main extends Component {

    constructor(props) {
        super(props);
        this.save = this.save.bind(this);
        this.to = this.to.bind(this);
        this.delete = this.delete.bind(this);
    }

    load() {
        client.get('pages/' + this.props.path).then(response => {
            this.set(response.data);
        });
    }

    save() {
        client.put('pages/' + this.props.path, this.state.page).then(response => {
            if (response.status === 200) {
                if (this.stay)
                    this.set(this.state.page);
                else
                    this.to();
            } else {
                // TODO
            }
        });
    }

    set(page) {
        this.page = JSON.parse(JSON.stringify(page));
        this.setState({
            page: page
        });
    }

    delete() {
        client.delete('pages/' + this.props.path).then(response => {
            if (response.status === 204) {
                window.location.href = '/';
            } else {
                // TODO
            }
        });
    }

    to() {
        window.location.href = '/pages/' + this.props.path;
    }

    verify() {
        return JSON.stringify(this.state.page) === JSON.stringify(this.page);
    }

    componentWillMount() {
        this.load();
    }

    render() {
        if (!this.state)
            return <div/>;
        var page = this.state.page;
        var messages = this.props.messages;
        return <main role="main" className="container-fluid">
            <Helmet>
                <title>{messages.pages.editor}</title>
            </Helmet>
            <h4><span className="fa fa-edit" aria-hidden="true"></span> {messages.pages.editor}</h4>
            <form onSubmit={(e) => {
                e.preventDefault();
                this.save();
            }}>
                <ul className="nav nav-tabs">
                    {Object.keys(locales).map(l =>
                        <li key={l} className={l === this.props.locale ? 'active' : ''}>
                            <a data-toggle="tab" href={'#' + l}>{locales[l]}</a>
                        </li>
                    )}
                </ul>
                <br/>
                <div className="tab-content">
                    {Object.keys(locales).map(l =>
                        <div key={l} id={l} className={'tab-pane fade' + (l === this.props.locale ? 'in active' : '')}>
                            <div className="form-group">
                                <input
                                    className="form-control"
                                    placeholder={messages.pages.model.title}
                                    defaultValue={page.properties[l].title}
                                    required
                                    onChange={(e) => {
                                        page.properties[l].title = e.target.value;
                                        this.setState({});
                                    }}
                                />
                            </div>
                            <input type="hidden" ref={'content'}/>
                            <div className="form-group">
                                <AceEditor
                                    className="form-control"
                                    mode="html"
                                    theme="textmate"
                                    onChange={(val) => {
                                        page.properties[l].content = val;
                                        this.setState({});
                                    }}
                                    width={'100%'}
                                    fontSize={14}
                                    value={page.properties[l].content}
                                />
                            </div>
                        </div>
                    )}
                </div>
                <input disabled={this.verify()} type="submit" className="btn btn-default" value={messages.save} onClick={() => this.stay = false}/>
                <input disabled={this.verify()} type="submit" className="btn btn-default" value={messages.apply} onClick={() => this.stay = true}/>
                <input type="button" className="btn btn-default" value={messages.cancel} onClick={this.to}/>
                <input type="button" className="btn btn-danger" value={messages.delete} data-toggle="modal" data-target="#actionModal"/>
            </form>
            <Modal messages={messages} messageAction={messages.delete} item={this.props.path} action={this.delete}/>
        </main>;
    }
}

ReactDOM.render(
    <Layout Main={Main}/>,
    document.getElementById('react')
);
