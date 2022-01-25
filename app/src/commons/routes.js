import React from 'react';
import {Route} from 'react-router-dom';

import Page from '../pages/App';

export default [
    <Route path="/cms/pages/:id" component={({match: {params}}) => <Page {...params}/>}/>
];
