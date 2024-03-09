const structByData = ({parents, id}) => ((parents ? parents.join('/') + '/' : '') + id).replace(/\./g, '/');

export default ({basename = ''} = {}) => {

    const pathByData = (type, resource, data) => `${basename}/static/${type}/${resource}/${structByData(data)}`;

    return {
        originByData: (resource, data) => pathByData('origin', resource, data),
        pathByData
    };
};
