import React from 'react';
import {Route} from 'react-router-dom';

import Page from '../pages/App';

export default components => [
    <Route path="/page/:id" component={({match}) => <Page id={match.params.id} {...{components}}/>}/>
];
