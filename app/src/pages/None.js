import React from 'react';
import {useLocale, useQuery} from 'react-admin';

import Page from './Page';

export default ({external, components}) => {

    const locale = useLocale();
    const {data} = useQuery({
        type: 'search',
        resource: 'pages',
        payload: {path: 'one/none', options: {locale}}
    });

    if (!data) {
        return <div/>;
    }

    return <Page {...{data, external, components}}/>;
};
