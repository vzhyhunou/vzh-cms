import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import Configuration from './Configuration';

export default Layout => [
    <Route exact path="/" component={() => <Redirect to="cms/pages/home"/>}/>,
    <Route exact path="/configuration" component={Configuration}/>,
    <Route path="/cms/:resource/:id" component={({match}) => <Layout resource={match.params.resource} id={match.params.id}/>} noLayout/>
];
