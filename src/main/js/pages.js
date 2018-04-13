'use strict';

import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {Header, Loader} from './commons';
import BootstrapTable from 'react-bootstrap-table-next';

const columns = [{
    dataField: 'id',
    text: 'Id'
}, {
    dataField: 'title',
    text: 'Title'
}];

class App extends Component {

    render() {
        return <div>
            <Header title="Pages"/>
            <Loader rel={'pages'} Table={({items}) => {
                return <PageTable pages={items}/>;
            }}/>
        </div>;
    }
}

class PageTable extends Component {

    render() {
        return <BootstrapTable keyField='id' data={this.props.pages} columns={columns} striped hover condensed/>;
    }
}

ReactDOM.render(
    <App/>,
    document.getElementById('react')
);
