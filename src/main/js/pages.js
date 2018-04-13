'use strict';

import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {Header, Data} from './commons';
import BootstrapTable from 'react-bootstrap-table-next';

const columns = [{
    dataField: 'id',
    text: 'Id'
}, {
    dataField: 'title',
    text: 'Title'
}];

const PageTable = ({items}) => {
    return <BootstrapTable keyField='id' data={items} columns={columns} striped hover condensed/>;
};

class App extends Component {

    render() {
        return <div>
            <Header title="Pages"/>
            <Data rel={'pages'} Table={PageTable}/>
        </div>;
    }
}

ReactDOM.render(
    <App/>,
    document.getElementById('react')
);
