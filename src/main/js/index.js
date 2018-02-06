'use strict';

import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import Header from './commons'

class App extends Component {

    render() {
        return (
            <Header title="Index"/>
        )
    }
}

ReactDOM.render(
    <App/>,
    document.getElementById('react')
);
