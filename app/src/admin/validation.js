import {useDataProvider} from 'react-admin';

export const useIdValidation = ({resource}) => {

    const dataProvider = useDataProvider();

    return async value => await dataProvider.getMany(resource, {ids: [value]}).then(({data}) => data.length && 'resources.validation.id');
};
