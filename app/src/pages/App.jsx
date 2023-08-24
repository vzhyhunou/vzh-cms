import React from 'react';
import {useParams} from 'react-router-dom';

import Parser from '../commons/Parser';
import useExchange from '../commons/data/useExchange';
import {useFuncProvider} from '../commons/AppContext';

export const PageComponent = ({id, external}) => {

    const {data, isLoading} = useExchange({path: `pages/search/one/${id}`});
    const {originByData} = useFuncProvider();

    if (isLoading) {
        return null;
    }

    if (!data) {
        return id !== 'none' && <PageComponent {...{id: 'none', external}}/>;
    }

    let {content, files, title} = data;

    if (external) {
        document.title = title;
    }

    files && files.forEach(name => content = content.replace(
        new RegExp(name, 'g'),
        `${originByData('pages', data)}/${name}`
    ));

    return <Parser {...{content}}/>;
};

export default () => {

    const {id} = useParams();

    return <PageComponent {...{id}} external={true}/>;
};
