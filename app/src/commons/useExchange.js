import {useQuery} from 'react-query';
import {useLocale, useDataProvider} from 'react-admin';

export default props => {

    const locale = useLocale();
    const dataProvider = useDataProvider();
    const p = {...props, options: {locale}};

    return useQuery(
        ['exchange', p],
        () => dataProvider.exchange(p).then(({data}) => data),
        {refetchOnWindowFocus: false}
    );
};
