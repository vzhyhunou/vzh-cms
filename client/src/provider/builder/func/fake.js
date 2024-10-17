import extList from 'ext-list';

export default () => {

    const map = extList();
    const dataByName = ({files}, name) => files.find(file => file.name === name).data;
    const func = {
        pathByData: (type, resource, data, name) => `data:${map.get(name.split('.')[1])};base64,${dataByName(data, name)}`,
        originByData: (resource, data, name) => func.pathByData(undefined, resource, data, name)
    };

    return func;
};