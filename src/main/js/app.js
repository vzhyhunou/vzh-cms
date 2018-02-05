'use strict';

const React = require('react');
const ReactDOM = require('react-dom');

class App extends React.Component {

    render() {
        return (
            <div>Hello</div>
        )
    }
}

ReactDOM.render(
    <App/>,
    document.getElementById('react')
);
