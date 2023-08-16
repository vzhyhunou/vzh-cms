import {useQuery} from 'react-query';
import {useDataProvider} from 'react-admin';

export default props => {

    const dataProvider = useDataProvider();

    return useQuery(
        ['exchange', props],
        () => dataProvider.exchange(props).then(({data}) => data),
        {refetchOnWindowFocus: false}
    );
};
