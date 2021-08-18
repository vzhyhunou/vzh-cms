import React from 'react';
import {useLocale, useQuery} from 'react-admin';

import Page from './Page';

export default ({internal, components}) => {

    const locale = useLocale();
    const {data} = useQuery({
        type: 'search',
        resource: 'pages',
        payload: {path: 'one/none', options: {locale}}
    });

    if (!data) {
        return <div/>;
    }

    return <Page {...{data, internal, components}}/>;
};
