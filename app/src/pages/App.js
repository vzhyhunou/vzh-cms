import React from 'react';
import {useLocale, useQuery} from 'react-admin';

import './App.css';
import Page from './Page';

const None = ({internal, components}) => {

    const locale = useLocale();
    const {data} = useQuery({
        type: 'search',
        resource: 'pages',
        payload: {path: 'one/none', options: {locale}}
    });

    if (!data) {
        return <div/>;
    }

    return <Page {...{...data, internal, components}}/>;
};

const App = ({id, internal, components}) => {

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
        return <None {...{internal, components}}/>;
    }

    return <Page {...{...data, internal, components}}/>;
};

export default App;
