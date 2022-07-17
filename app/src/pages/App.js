import React, {memo} from 'react';
import {useParams} from 'react-router-dom';

import {originByData} from '../commons/upload';
import Parser from '../commons/Parser';
import {useExchange} from '../commons';

const Content = memo(data => {

    let {content, files} = data;

    files && files.forEach(name => content = content.replace(
        new RegExp(name, 'g'),
        `${originByData('pages', data)}/${name}`
    ));

    return <Parser {...{content}}/>;
});

export const PageComponent = ({id, external}) => {

    const {data, isLoading} = useExchange({path: `pages/search/one/${id}`});

    if (isLoading) {
        return null;
    }

    if (!data) {
        return id !== 'none' && <PageComponent {...{id: 'none', external}}/>;
    }

    if (external) {
        document.title = data.title;
    }

    return <Content {...data}/>;
};

export default () => {

    const {id} = useParams();

    return <PageComponent {...{id}} external={true}/>;
};
