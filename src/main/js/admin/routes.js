'use strict';

import React from 'react';
import { Route } from 'react-router-dom';
import Configuration from './configuration';

export default [
    <Route exact path="/configuration" component={Configuration} />
];
