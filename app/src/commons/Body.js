import React, {cloneElement, memo} from 'react';

export default memo(({routes}) =>
    <>
        {routes.map((route, key) => cloneElement(route, {key}))}
    </>
);
