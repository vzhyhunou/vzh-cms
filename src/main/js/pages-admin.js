'use strict';

import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {Helmet} from 'react-helmet';
import {textFilter} from 'react-bootstrap-table2-filter';
import {Layout, Table} from './commons';

const columns = [{
    dataField: 'id',
    text: 'Id',
    sort: true,
    filter: textFilter()
}, {
    dataField: 'title',
    text: 'Title'
}];

const Main = () => (
    <main role="main" className="container-fluid">
        <Helmet>
            <title>Pages</title>
        </Helmet>
        <Table rel={'pages'} columns={columns}/>
    </main>
);

ReactDOM.render(
    <Layout Main={Main}/>,
    document.getElementById('react')
);
