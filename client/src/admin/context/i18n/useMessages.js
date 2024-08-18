import {useState, useEffect} from 'react';

import {useContextProvider} from '../../..';

export default () => {

    const [value, setValue] = useState();
    const {localeProvider: {getMessages}} = useContextProvider();

    useEffect(() => {
        getMessages().then(setValue);
    }, [getMessages]);

    return value;
};
