import React, {memo, useEffect, useState, Fragment} from 'react';
import parse, {domToReact} from 'html-react-parser';
import {useLocale, useDataProvider} from 'react-admin';

import {GET_ONE_LOCALE} from '../commons/rest';

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

const App = ({id, internal}) => {

    const locale = useLocale();
    const dataProvider = useDataProvider();
    const [page, setPage] = useState();

    useEffect(() => {

        dataProvider(GET_ONE_LOCALE, 'pages', {id}).then(response => {

            const {data} = response;

            if (data) {
                setPage(data);
                return;
            }

            dataProvider(GET_ONE_LOCALE, 'pages', {id: 'none'}).then(response => setPage(response.data));
        });
    }, [locale, id, dataProvider]);

    if (!page)
        return <div/>;

    return <EnhancedArea {...page} internal={internal}/>;
};

export default App;
