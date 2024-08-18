import {useState, useEffect} from 'react';

import {useContextProvider} from '../../..';

export default () => {

    const [value, setValue] = useState();
    const {localeProvider: {getLocale}} = useContextProvider();

    useEffect(() => {
        getLocale().then(setValue);
    }, [getLocale]);

    return value;
};
