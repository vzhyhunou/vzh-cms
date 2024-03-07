import React from 'react';

import {Parser, useExchange, useContextProvider} from '../../..';

const Component = ({id, external, ...props}) => {

    const {data, isLoading} = useExchange({path: `pages/search/one/${id}`});
    const {funcProvider: {originByData}} = useContextProvider();

    if (isLoading) {
        return null;
    }

    if (!data) {
        return id !== 'none' && <Component {...{id: 'none', external}}/>;
    }

    let {content, files, title} = data;

    if (external) {
        document.title = title;
    }

    files && files.forEach(name => content = content.replace(
        new RegExp(name, 'g'),
        `${originByData('pages', data)}/${name}`
    ));

    return <Parser {...{content}} bindings={{props}}/>;
};

export default Component;