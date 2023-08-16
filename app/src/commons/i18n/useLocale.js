import {useState, useEffect} from 'react';

import {useLocaleProvider} from '..';

export default () => {

    const [value, setValue] = useState();
    const {getLocale} = useLocaleProvider();

    useEffect(() => {
        getLocale().then(setValue);
    }, [getLocale]);

    return value;
};
