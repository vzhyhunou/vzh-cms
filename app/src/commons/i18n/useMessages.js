import {useState, useEffect} from 'react';

import {useLocaleProvider} from '../AppContext';

export default () => {

    const [value, setValue] = useState();
    const {getMessages} = useLocaleProvider();

    useEffect(() => {
        getMessages().then(setValue);
    }, [getMessages]);

    return value;
};
