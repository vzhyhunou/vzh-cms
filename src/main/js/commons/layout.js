'use strict';

import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import {i18nLoader, i18nUpdater} from './locales';
import Bar from './bar';

export default class extends Component {

    path = window.location.pathname.split('/').slice(1);

    componentWillMount() {
        i18nLoader().then(state => this.setState(state));
    }

    changeLocale = locale => i18nUpdater(locale).then(messages => this.setState({locale, messages}));

    render() {
        if (!this.state)
            return <div/>;

        const {Main} = this.props;

        return <div>
            <Bar {...this.state} changeLocale={this.changeLocale} path={this.path}/>
            <Main {...this.state} path={this.path.slice(1)}/>
        </div>;
    }
}
