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

    const formerFiles = params.data.files ? params.data.files
        .filter(({rawFile}) => !rawFile)
        .filter(({title}) => JSON.stringify({
            ...params.data,
            files: []
        }).includes(title)) : [];
    const sanitizedData = {
        ...params.data,
        files: params.data.files ? params.data.files
            .filter(({rawFile}) => rawFile)
            .filter(({src}) => JSON.stringify({
                ...params.data,
                files: []
            }).includes(src)) : []
    };

    return Promise.all(
        dumpKeysRecursively(sanitizedData)
        .filter(key => get(sanitizedData, `${key}.rawFile`))
        .map(key =>
            convertFileToBase64(
                get(sanitizedData, key)
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
                    preview: get(sanitizedData, `${key}.src`)
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
                    ...replaceFiles(sanitizedData, transformedNewFiles),
                    ...replaceFields(sanitizedData, formerFiles),
                    ...replaceSrc(resource, sanitizedData, transformedNewFiles),
                    files: [
                        ...transformedNewFiles.map(({data, name}) => ({data, name})),
                        ...formerFiles.map(({title}) => ({name: title}))
                    ],
                },
            })
    );
}

const analyze = (resource, item) => {

    if (!item.files) {
        return item;
    }

    const files = item.files.map(({name}) => ({
        name,
        keys: dumpKeysRecursively(item).filter(key => get(item, key) === name)
    }));
    const analyzed = analyzeFiles(resource, files, item);

    return {
        ...analyzed,
        files: analyzed.files.map(({name}) => name)
    };
};

const analyzeFiles = (resource, files, data) => {
    const path = pathByData(resource, data);
    files.forEach(({name, keys}) => keys.forEach(key => set(data, key, {
        src: `${path}/${name}`,
        title: name
    })));
    return data;
};

const replaceFiles = (data, files) => {
    files.forEach(({name, keys}) => keys.forEach(key => set(data, key, name)));
    return data;
};

const replaceSrc = (resource, data, files) => {
    let s = JSON.stringify(data);
    const path = pathByData(resource, data);
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

const pathByData = (resource, data) => {
    const {parents, id} = data;
    const s = ((parents ? parents.join('/') + '/' : '') + id).replace(/\./g, '/');
    return `/static/origin/${resource}/${s}`;
};
