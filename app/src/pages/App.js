import React from 'react';
import {useLocale, useQuery} from 'react-admin';

import Parser from '../commons/Parser';

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

    if (external) {
        document.title = data.title;
    }

    return <Parser {...{data, components}}/>;
};

export default App;
