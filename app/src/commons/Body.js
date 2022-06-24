import React, {cloneElement} from 'react';

export default ({routes}) =>
    <>
        {routes.map((route, key) => cloneElement(route, {key}))}
    </>
;
