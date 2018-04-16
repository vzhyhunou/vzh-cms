'use strict';

import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {Helmet} from 'react-helmet';
import {Layout, Data} from './commons';
import BootstrapTable from 'react-bootstrap-table-next';

const columns = [{
    dataField: 'id',
    text: 'Id'
}, {
    dataField: 'title',
    text: 'Title'
}];

const Table = ({items}) => (
    <BootstrapTable keyField='id' data={items} columns={columns} striped hover condensed/>
);

const Main = () => (
    <main role="main" className="container-fluid">
        <Helmet>
            <title>Pages</title>
        </Helmet>
        <Data rel={'pages'} Table={Table}/>
    </main>
);

ReactDOM.render(
    <Layout Main={Main}/>,
    document.getElementById('react')
);
