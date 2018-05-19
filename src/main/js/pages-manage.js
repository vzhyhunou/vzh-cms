'use strict';

import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {Helmet} from 'react-helmet';
import {textFilter} from 'react-bootstrap-table2-filter';
import {Layout} from './commons';
import {Table} from './table';

const Main = (props) => (
    <main role="main" className="container-fluid">
        <Helmet>
            <title>{props.messages.pages.manager}</title>
        </Helmet>
        <Table
            rel={'pages'}
            columns={[{
                dataField: 'id',
                text: 'Id',
                sort: true,
                filter: textFilter(),
                formatter: (cell) => <a href={'pages/' + cell}>{cell}</a>
            }, {
                dataField: 'properties.' + props.locale + '.title',
                text: 'Title'
            }]}
            locale={props.locale}
            messages={props.messages}
        />
    </main>
);

ReactDOM.render(
    <Layout Main={Main}/>,
    document.getElementById('react')
);
