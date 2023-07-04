const pathByData = ({parents, id}) => ((parents ? parents.join('/') + '/' : '') + id).replace(/\./g, '/');

export default basename => ({
    originByData: (resource, data) => `${basename}/static/origin/${resource}/${pathByData(data)}`,
    pathByData
});
