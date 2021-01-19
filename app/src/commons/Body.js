import React, {cloneElement, memo} from 'react';

import './App.css';
import routes from './routes';
import components from '../pages/components';

export default memo(() =>
    <>
        {routes(components).map((route, key) => cloneElement(route, {key}))}
    </>
);
