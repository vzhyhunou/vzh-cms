import React from 'react';
import {useLocale, useQuery} from 'react-admin';

import Parser from '../commons/Parser';

const Page = ({id, external}) => {

    const locale = useLocale();
    const {data, loading} = useQuery({
        type: 'search',
        resource: 'pages',
        payload: {path: `one/${id}`, options: {locale}}
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

    return <Parser {...data}/>;
};

export default Page;
