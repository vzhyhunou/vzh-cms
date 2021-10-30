import React from 'react';
import {useLocale, useQuery} from 'react-admin';

import Page from './Page';
import None from './None';

export default ({id, external, components}) => {

    const locale = useLocale();
    const {data, loading} = useQuery({
        type: 'search',
        resource: 'pages',
        payload: {path: `one/${id}`, options: {locale}}
    });

    if (loading) {
        return <div/>;
    }

    if (!data) {
        return <None {...{external, components}}/>;
    }

    return <Page {...{data, external, components}}/>;
};
