import React from 'react';
import parse, {domToReact} from 'html-react-parser';
import {useLocale, useQuery} from 'react-admin';

import './App.css';

const Page = ({title, content, internal}) => {

    if (!internal) {
        document.title = title;
    }

    const options = {
        replace: ({name, attribs, children}) => {
            if (name === 'page') {
                return <>
                    <App id={attribs.id} internal/>
                    {domToReact(children, options)}
                </>;
            }
        }
    };
    return <>
        {parse(content, options)}
    </>;
};

const None = ({internal}) => {

    const locale = useLocale();
    const {data} = useQuery({
        type: 'search',
        resource: 'pages',
        payload: {path: 'one/none', options: {locale}}
    });

    if (!data) {
        return <div/>;
    }

    return <Page {...{...data, internal}}/>;
};

const App = ({id, internal}) => {

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
        return <None {...{internal}}/>;
    }

    return <Page {...{...data, internal}}/>;
};

export default App;
