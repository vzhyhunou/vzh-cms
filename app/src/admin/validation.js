import {useDataProvider, useResourceContext} from 'react-admin';

export const useIdValidation = () => {

    const {getMany} = useDataProvider();
    const resource = useResourceContext();

    return async value => await getMany(resource, {ids: [value]})
        .then(({data}) => data.length && 'resources.validation.id');
};
