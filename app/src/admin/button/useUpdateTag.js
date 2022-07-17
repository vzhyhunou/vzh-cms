import {
    useUpdateMany,
    useNotify,
    useUnselectAll,
    useListContext,
    useGetMany,
    useResourceContext
} from 'react-admin';

export default getData => {

    const resource = useResourceContext();
    const {selectedIds} = useListContext();
    const {data} = useGetMany(
        resource,
        {ids: selectedIds}
    );
    const notify = useNotify();
    const unselectAll = useUnselectAll(resource);
    const [updateMany] = useUpdateMany();

    return tag => updateMany(
        resource,
        {
            ids: selectedIds,
            data: data.map(r => getData(r, tag))
        },
        {
            onSuccess: () => {
                notify('ra.notification.updated', {
                    type: 'info',
                    messageArgs: { smart_count: selectedIds.length },
                    undoable: true,
                });
                unselectAll();
            },
            onError: error =>
                notify(
                    typeof error === 'string'
                        ? error
                        : error.message || 'ra.notification.http_error',
                    { type: 'warning' }
                ),
            mutationMode: 'undoable'
        }
    );
};
