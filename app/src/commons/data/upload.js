import { dumpKeysRecursively } from 'recursive-keys';
import get from 'lodash/get';
import set from 'lodash/set';
import md5 from 'js-md5';

const convertFileToBase64 = f => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(f);
});

const upd = (params, call) => {

    const sanitized = {
        ...params.data,
        files: [],
        '@files': []
    };
    const sanitizedData = JSON.stringify({
        ...sanitized,
        names: dumpKeysRecursively(sanitized)
            .map(key => get(sanitized, `${key}.rawFile`))
            .filter(f => f)
            .map(({name}) => name)
    });
    const formFiles = params.data.files ? params.data.files
        .filter(({rawFile}) => !rawFile)
        .filter(({title}) => sanitizedData.includes(title)) : [];

    return Promise.all(
        dumpKeysRecursively(params.data)
            .map(key => ({key, f: get(params.data, `${key}.rawFile`)}))
            .filter(({f}) => f)
            .filter(({f: {name}}) => sanitizedData.includes(name))
            .map(({key, f}) => convertFileToBase64(f)
                .then(picture64 => ({
                    data: picture64.match(/,(.*)/)[1],
                    type: picture64.match(/\/(.*);/)[1]
                }))
                .then(({data, type}) => ({
                    data,
                    key,
                    name: `${md5(data)}.${type}`,
                    preview: f.name
                }))
            )
    )
        .then(handle)
        .then(transformedNewFiles => call({
            ...params,
            data: {
                ...replaceFiles(params.data, transformedNewFiles),
                ...replaceFormFiles(params.data, formFiles),
                ...replaceSrc(params.data, transformedNewFiles, formFiles),
                files: [
                    ...transformedNewFiles.map(({data, name}) => ({data, name})),
                    ...formFiles.map(({title}) => ({name: title}))
                ],
                '@files': undefined
            }
        }));
}

const analyzeFields = (path, fields, data) => {
    const result = JSON.parse(JSON.stringify(data));
    fields.forEach(({name, keys}) => keys.forEach(key => set(result, key, {
        src: `${path}/${name}`,
        title: name
    })));
    return result;
};

const analyzeContents = (path, contents) => {
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

const replaceFormFiles = (data, formFiles) => {
    formFiles.forEach(({title}) => dumpKeysRecursively(data)
        .filter(key => get(get(data, key), 'title') === title)
        .forEach(key => set(data, key, title))
    );
    return data;
};

const replaceSrc = (data, files, formFiles) => {
    let s = JSON.stringify(data);
    files.forEach(({name, previews}) => previews.forEach(preview => preview && (s = s.replace(
        new RegExp(preview, 'g'),
        name
    ))));
    formFiles.forEach(({src, title}) => s = s.replace(
        new RegExp(src, 'g'),
        title
    ));
    return JSON.parse(s);
};

const handle = files => [...new Set(files.map(f => f.name))]
    .map(n => files.filter(({name}) => name === n))
    .map(f => ({
        ...f[0],
        keys: f.map(f => f.key),
        previews: f.map(f => f.preview)
    }));

export default (dataProvider, {originByData}) => {

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

        const i = analyzeFields(path, fields, item);

        return {
            ...i,
            files: i.files.map(({name}) => name),
            '@files': analyzeContents(path, contents)
        };
    };

    return {
        ...dataProvider,
        create: (resource, params) => upd(params, p => dataProvider.create(resource, p)),
        update: (resource, params) => upd(params, p => dataProvider.update(resource, p)),
        getOne: (resource, params) => dataProvider.getOne(resource, params).then(response => ({
            ...response,
            data: analyze(resource, response.data)
        })),
        getList: (resource, params) => dataProvider.getList(resource, params).then(response => ({
            ...response,
            data: response.data.map(item => analyze(resource, item))
        })),
        getMany: (resource, params) => dataProvider.getMany(resource, params).then(response => ({
            ...response,
            data: response.data.map(item => analyze(resource, item))
        })),
        exchange: params => params.data ? upd(params, p => dataProvider.exchange(p)) : dataProvider.exchange(params)
    };
};
