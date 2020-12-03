import React, {memo, Fragment} from 'react';
import parse, {domToReact} from 'html-react-parser';
import {useLocale, useQuery} from 'react-admin';

import './App.css';

const Area = ({title, content, internal}) => {

    if (!internal) document.title = title;

    const options = {
        replace: ({name, attribs, children}) => {
            if (name === 'page') {
                return <Fragment>
                    <App id={attribs.id} internal/>
                    {domToReact(children, options)}
                </Fragment>;
            }
        }
    };
    return <Fragment>
        {parse(content, options)}
    </Fragment>;
};

const EnhancedArea = memo(Area);

const None = ({internal}) => {

    const locale = useLocale();
    const {data} = useQuery({
        type: 'search',
        resource: 'pages',
        payload: {path: 'one/none', options: {locale}}
    });

    if (!data)
        return <div/>;

    return <EnhancedArea {...{...data, internal}}/>;
};

const App = ({id, internal}) => {

    const locale = useLocale();
    const {data, loading} = useQuery({
        type: 'search',
        resource: 'pages',
        payload: {path: `one/${id}`, options: {locale}}
    });

    if (loading)
        return <div/>;

    if (!data)
        return <None {...{internal}}/>;

    return <EnhancedArea {...{...data, internal}}/>;
};

export default App;
