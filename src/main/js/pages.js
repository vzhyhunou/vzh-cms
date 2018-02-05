'use strict';

import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import Title from './commons'

class App extends Component {

    render() {
        return (
            <Title text="Pages"/>
        )
    }
}

ReactDOM.render(
    <App/>,
    document.getElementById('react')
);
