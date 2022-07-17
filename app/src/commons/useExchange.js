import {useQuery} from 'react-query';
import {useLocale, useDataProvider} from 'react-admin';

export default props => {

    const locale = useLocale();
    const dataProvider = useDataProvider();
    const p = {...props, options: {locale}};
    const {data, isLoading} = useQuery(
        ['exchange', p],
        () => dataProvider.exchange(p)
    );

    return ({isLoading, data: data && data.data});
};
