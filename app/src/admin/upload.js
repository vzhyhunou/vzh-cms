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
        }))
});

const upd = (resource, params, call) => {

    const formerFiles = params.data.files ? params.data.files
        .filter(({rawFile}) => !rawFile)
        .filter(({title}) => JSON.stringify({
            ...params.data,
            files: []
        }).includes(title)) : [];

    return Promise.all(
        dumpKeysRecursively(params.data)
            .filter(key => get(params.data, `${key}.rawFile`))
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
                },
            })
    );
}

const analyze = (resource, item) => {

    if (!item.files) return item;

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
    files.forEach(({name, keys}) => keys.forEach(key => set(data, key, {
        src: `/static/origin/${resource}/${pathById(data.id)}/${name}`,
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
    files.forEach(({name, previews}) => previews.forEach(preview => s = s.replace(
        new RegExp(preview, 'g'),
        `/static/origin/${resource}/${pathById(data.id)}/${name}`
    )));
    return JSON.parse(s);
};

const replaceFields = (data, formerFiles) => {
    formerFiles.forEach(({title}) => dumpKeysRecursively(data)
        .filter(key => get(data, key))
        .filter(key => get(data, key).title === title)
        .forEach(key => set(data, key, title))
    );
    return data;
};

const process = files => {
    const map = new Map();
    files.forEach(file => {
        let f = map.get(file.name);
        if (!f) {
            f = {
                ...file,
                keys: [],
                previews: []
            };
            map.set(file.name, f);
        }
        f.keys.push(file.key);
        f.previews.push(file.preview);
    });
    return Array.from(map.values());
};

const pathById = s => s.replace(/\./g, '/');
