import {useDataProvider, useResourceContext} from 'react-admin';

export const useIdValidation = () => {

    const dataProvider = useDataProvider();
    const resource = useResourceContext();

    return async value => await dataProvider.getMany(resource, {ids: [value]})
        .then(({data}) => data.length && 'resources.validation.id');
};
