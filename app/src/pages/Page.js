import React, {memo} from 'react';
import {useLocale, useQuery} from 'react-admin';

import {originByData} from '../commons/upload';
import Parser from '../commons/Parser';

const Content = memo(data => {

    let {content, files} = data;

    files && files.forEach(name => content = content.replace(
        new RegExp(name, 'g'),
        `${originByData('pages', data)}/${name}`
    ));

    return <Parser {...{content}}/>;
});

const Page = ({id, external}) => {

    const locale = useLocale();
    const {data, loading} = useQuery({
        type: 'exchange',
        payload: {path: `pages/search/one/${id}`, options: {locale}}
    });

    if (loading) {
        return null;
    }

    if (!data) {
        return id !== 'none' && <Page {...{id: 'none', external}}/>;
    }

    if (external) {
        document.title = data.title;
    }

    return <Content {...data}/>;
};

export default Page;
