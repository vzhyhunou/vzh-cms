import {useSelector} from 'react-redux';
import {
    useMutation,
    useRefresh,
    useNotify,
    useUnselectAll,
    CRUD_UPDATE_MANY
} from 'react-admin';

export default (resource, selectedIds, data) => {

    const records = useSelector(({admin}) => selectedIds.map(id => admin.resources[resource].data[id]));
    const notify = useNotify();
    const unselectAll = useUnselectAll();
    const refresh = useRefresh();
    const [mutate] = useMutation();

    return tag => mutate(
        {
            type: 'updateMany',
            resource,
            payload: {
                ids: selectedIds,
                data: records.map(r => data(r, tag))
            }
        },
        {
            action: CRUD_UPDATE_MANY,
            onSuccess: () => {
                notify(
                    'ra.notification.updated',
                    'info',
                    { smart_count: selectedIds.length },
                    true
                );
                unselectAll(resource);
                refresh();
            },
            onFailure: error =>
                notify(
                    typeof error === 'string'
                        ? error
                        : error.message || 'ra.notification.http_error',
                    'warning'
                ),
            undoable: true
        }
    );
};
