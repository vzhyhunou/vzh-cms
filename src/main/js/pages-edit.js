'use strict';

import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {Helmet} from 'react-helmet';
import {Layout} from './commons';
import client from "./client";

const root = '/api/';

class Main extends Component {

    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    loadData() {
        client({
            method: 'GET',
            path: root + 'pages/' + this.props.path
        }).then(item => {
            this.setState({
                page: item.entity
            });
        });
    }

    saveData() {
        client({
            method: 'PUT',
            path: root + 'pages/' + this.props.path,
            entity: this.state.page,
            headers: {'Content-Type': 'application/json'}
        }).then(response => {
            if (response.status.code === 200)
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
        this.state.page.properties[this.props.locale].title = ReactDOM.findDOMNode(this.refs.title).value;
        this.state.page.properties[this.props.locale].content = ReactDOM.findDOMNode(this.refs.content).value;
        this.saveData();
    }

    render() {
        if (!this.state)
            return <div/>;
        return <main role="main" className="container-fluid">
            <Helmet>
                <title>{this.props.messages.pages.editor}</title>
            </Helmet>
            <h4><span className="fa fa-edit" aria-hidden="true"></span> {this.props.messages.pages.editor}</h4>
            <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                    <input className="form-control" placeholder={this.props.messages.pages.model.title} ref={'title'} defaultValue={this.state.page.properties[this.props.locale].title} required/>
                </div>
                <div className="form-group">
                    <textarea className="form-control" rows="20" placeholder={this.props.messages.pages.model.content} ref={'content'} defaultValue={this.state.page.properties[this.props.locale].content} required/>
                </div>
                <input type="submit" className="btn btn-primary" value={this.props.messages.apply}/>
            </form>
        </main>;
    }
}

ReactDOM.render(
    <Layout Main={Main}/>,
    document.getElementById('react')
);
