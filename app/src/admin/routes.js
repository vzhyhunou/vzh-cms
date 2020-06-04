import React from 'react';
import {Route, Redirect} from 'react-router-dom';

import Configuration from './Configuration';
import Layout from '../commons/Layout';

export default [
    <Route exact path="/" component={() => <Redirect to="page/home"/>}/>,
    <Route exact path="/configuration" component={Configuration}/>,
    <Route path="/page" render={() => <Layout/>} noLayout/>
];
