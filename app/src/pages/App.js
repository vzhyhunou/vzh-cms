import React from 'react';
import {useLocale, useQuery} from 'react-admin';

import Page from './Page';

const App = ({id, external, components}) => {

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
        return id !== 'none' && <App {...{id: 'none', external, components}}/>;
    }

    return <Page {...{data, external, components}}/>;
};

export default App;
