import React, {cloneElement} from 'react';

export default ({customRoutes}) =>
    <>
        {customRoutes.map((route, key) => cloneElement(route, {key}))}
    </>
;
