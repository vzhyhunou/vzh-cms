import React from 'react';
import {Route} from 'react-router-dom';

import Page from '../pages/App';

export default components => [
    <Route path="/cms/pages/:id" component={({match: {params: {id}}}) => <Page {...{components, id}}/>}/>
];
