'use strict';

import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {Header, Loader} from './commons';

class PageList extends Component {

    render() {
        return <table>
            <tbody>
            <tr>
                <th>Id</th>
                <th>Title</th>
            </tr>
            {(() => {
                return this.props.pages.map(page =>
                    <Page key={page.id} page={page}/>
                );
            })()}
            </tbody>
        </table>
    }
}

class Page extends Component {

    render() {
        return <tr>
            <td>{this.props.page.id}</td>
            <td>{this.props.page.title}</td>
            {/*<td>{this.props.page.content}</td>
                <td dangerouslySetInnerHTML={{__html: this.props.page.content}}/>*/}
        </tr>
    }
}

ReactDOM.render(
    <div>
        <Header title="Pages"/>
        <Loader rel={'pages'} List={({items}) => {
            return <PageList pages={items}/>;
        }}/>
    </div>,
    document.getElementById('react')
);
