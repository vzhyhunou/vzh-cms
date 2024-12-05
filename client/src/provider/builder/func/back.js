export default ({basename = ''} = {}) => {

    const structByData = ({parents, id}) => ((parents ? parents.join('/') + (parents.length ? '/' : '') : '') + id).replace(/\./g, '/');
    const func = {
        pathByData: (type, resource, data, name) => `${basename}/static/${type}/${resource}/${structByData(data)}/${name}`,
        originByData: (resource, data, name) => func.pathByData('origin', resource, data, name)
    };

    return func;
};
