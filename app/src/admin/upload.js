import { dumpKeysRecursively } from 'recursive-keys';
import get from 'lodash/get';
import set from 'lodash/set';
import md5 from 'js-md5';

const convertFileToBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file.rawFile);
});

export default dataProvider => ({

    ...dataProvider,

    create: (resource, params) =>
        upd(resource, params, dataProvider.create),

    update: (resource, params) =>
        upd(resource, params, dataProvider.update),

    getOne: (resource, params) =>
        dataProvider.getOne(resource, params).then(response => ({
            ...response,
            data: analyze(resource, response.data)
        })),

    getList: (resource, params) =>
        dataProvider.getList(resource, params).then(response => ({
            ...response,
            data: response.data.map(item => analyze(resource, item))
        })),

    getMany: (resource, params) =>
        dataProvider.getMany(resource, params).then(response => ({
            ...response,
            data: response.data.map(item => analyze(resource, item))
        }))
});

const upd = (resource, params, call) => {

    const sanitizedData = JSON.stringify({
        ...params.data,
        files: [],
        '@files': []
    });
    const formerFiles = params.data.files ? params.data.files
        .filter(({rawFile}) => !rawFile)
        .filter(({title}) => sanitizedData.includes(title)) : [];

    return Promise.all(
        dumpKeysRecursively(params.data)
        .filter(key => get(params.data, `${key}.rawFile`))
        .filter(key => sanitizedData.includes(get(params.data, `${key}.src`)))
        .map(key =>
            convertFileToBase64(
                get(params.data, key)
            ).then(
                picture64 => ({
                    data: picture64.match(/,(.*)/)[1],
                    type: picture64.match(/\/(.*);/)[1]
                })
            ).then(
                ({data, type}) => ({
                    data,
                    type,
                    key,
                    name: `${md5(data)}.${type}`,
                    preview: get(params.data, `${key}.src`)
                })
            )
        )
    ).then(
        process
    ).then(
        transformedNewFiles =>
            call(resource, {
                ...params,
                data: {
                    ...replaceFiles(params.data, transformedNewFiles),
                    ...replaceFields(params.data, formerFiles),
                    ...replaceSrc(resource, params.data, transformedNewFiles),
                    files: [
                        ...transformedNewFiles.map(({data, name}) => ({data, name})),
                        ...formerFiles.map(({title}) => ({name: title}))
                    ],
                    '@files': undefined
                }
            })
    );
}

const analyze = (resource, item) => {

    if (!item.files) {
        return item;
    }

    const names = item.files.map(({name}) => name);
    const keys = dumpKeysRecursively(item);
    const fields = names.map(name => ({
        name,
        keys: keys.filter(key => get(item, key) === name)
    }));
    const contents = keys
        .map(key => ({
            key,
            value: get(item, key)
        }))
        .filter(({value}) => typeof value === 'string')
        .map(({key, value}) => ({
            key,
            names: names
                .filter(name => value.includes(name))
                .filter(name => value !== name)
        }))
        .filter(({names}) => names.length);
    const path = originByData(resource, item);

    analyzeFields(path, fields, item);

    return {
        ...item,
        files: item.files.map(({name}) => name),
        '@files': analyzeContents(path, contents, item)
    };
};

const analyzeFields = (path, fields, data) => {
    fields.forEach(({name, keys}) => keys.forEach(key => set(data, key, {
        src: `${path}/${name}`,
        title: name
    })));
};

const analyzeContents = (path, contents, data) => {
    const result = {};
    contents.forEach(({key, names}) => set(result, key, names.map(name => ({
        src: `${path}/${name}`,
        title: name
    }))));
    return result;
};

const replaceFiles = (data, files) => {
    files.forEach(({name, keys}) => keys.forEach(key => set(data, key, name)));
    return data;
};

const replaceSrc = (resource, data, files) => {
    let s = JSON.stringify(data);
    const path = originByData(resource, data);
    files.forEach(({name, previews}) => previews.forEach(preview => preview && (s = s.replace(
        new RegExp(preview, 'g'),
        `${path}/${name}`
    ))));
    return JSON.parse(s);
};

const replaceFields = (data, formerFiles) => {
    formerFiles.forEach(({title}) => dumpKeysRecursively(data)
        .filter(key => get(get(data, key), 'title') === title)
        .forEach(key => set(data, key, title))
    );
    return data;
};

const process = files => [...new Set(files.map(f => f.name))]
    .map(n => files.filter(({name}) => name === n))
    .map(f => ({
        ...f[0],
        keys: f.map(f => f.key),
        previews: f.map(f => f.preview)
    }));

export const originByData = (resource, data) => `/static/origin/${resource}/${pathByData(data)}`;

export const pathByData = ({parents, id}) => ((parents ? parents.join('/') + '/' : '') + id).replace(/\./g, '/');
