'use strict';

import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {Helmet} from 'react-helmet';
import AceEditor from 'react-ace';
import 'brace/mode/html';
import 'brace/theme/textmate';
import {Layout} from './commons';
import client from "./client";
import {locales} from './commons';

class Main extends Component {

    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    loadData() {
        client.get('pages/' + this.props.path).then(response => {
            this.setState({
                page: response.data
            });
        });
    }

    saveData() {
        client.put('pages/' + this.props.path, this.state.page).then(response => {
            if (response.status === 200)
                window.location.href = '/pages/' + this.props.path;
            else {
                // TODO
            }
        });
    }

    componentWillMount() {
        this.loadData();
    }

    handleSubmit(e) {
        e.preventDefault();
        this.saveData();
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
            <form onSubmit={this.handleSubmit}>
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
                                    onChange={(e) => page.properties[l].title = e.target.value}
                                />
                            </div>
                            <input type="hidden" ref={'content'}/>
                            <div className="form-group">
                                <AceEditor
                                    className="form-control"
                                    mode="html"
                                    theme="textmate"
                                    onChange={(val) => page.properties[l].content = val}
                                    width={'100%'}
                                    fontSize={14}
                                    value={page.properties[l].content}
                                />
                            </div>
                        </div>
                    )}
                </div>
                <input type="submit" className="btn btn-primary" value={messages.save}/>
            </form>
        </main>;
    }
}

ReactDOM.render(
    <Layout Main={Main}/>,
    document.getElementById('react')
);
