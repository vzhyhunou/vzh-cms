import {useDataProvider, useResourceContext} from 'react-admin';

export const useIdValidation = () => {

    const {getOne} = useDataProvider();
    const resource = useResourceContext();

    return async id => await getOne(resource, {id}).then(() => 'resources.validation.id', () => {});
};
