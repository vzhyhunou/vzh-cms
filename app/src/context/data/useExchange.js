import {useQuery} from 'react-query';
import {useDataProvider} from 'react-admin';

export default props => {

    const {exchange} = useDataProvider();

    return useQuery(
        ['exchange', props],
        () => exchange(props).then(({data}) => data),
        {refetchOnWindowFocus: false}
    );
};
