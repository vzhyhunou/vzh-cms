import {useQuery} from '@tanstack/react-query';
import {useDataProvider} from 'react-admin';

export default props => {

    const {exchange} = useDataProvider();

    return useQuery({
        queryKey: ['exchange', props],
        queryFn: () => exchange(props).then(({data}) => data),
        refetchOnWindowFocus: false
    });
};
