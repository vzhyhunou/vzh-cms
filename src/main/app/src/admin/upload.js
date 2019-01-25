import {CREATE, UPDATE,} from 'react-admin';
import {dumpKeysRecursively} from 'recursive-keys';
import get from 'lodash/get';
import set from 'lodash/set';
import md5 from 'js-md5';

const convertFileToBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file.rawFile);
});

export default requestHandler => (type, resource, params) => {
    if (type === UPDATE || type === CREATE) {

        const keys = dumpKeysRecursively(params.data).filter(k => get(params.data, k).rawFile instanceof File);

        if (keys.length) {

            return Promise.all(keys.map(key => convertFileToBase64(get(params.data, key))))
                .then(base64Files => base64Files.map((picture64, index) => ({
                    data: picture64.match(/,(.*)/)[1],
                    type: picture64.match(/\/(.*);/)[1],
                    key: keys[index]
                })))
                .then(base64Files => base64Files.map(({type, ...rest}) => ({
                    ...rest,
                    path: `${md5(rest.data)}.${type}`,
                    preview: get(params.data, rest.key).rawFile.preview
                })))
                .then(process)
                .then(transformedNewFiles =>
                    requestHandler(type, resource, {
                        ...params,
                        data: {
                            ...replaceFiles(params.data, transformedNewFiles),
                            ...replaceSrc(resource, params, transformedNewFiles),
                            files: [
                                ...transformedNewFiles.map(({data, path}) => ({data, path}))
                            ],
                        },
                    })
                );
        }
    }

    return requestHandler(type, resource, params).then(responseHandler);
};

const responseHandler = response => {
    const {data} = response;
    const s = JSON.stringify(data);
    const set = new Set();
    const exp = /<img.*?src=\\"(.*?)\\"/g;
    let result;
    while ((result = exp.exec(s)) !== null) {
        set.add(result[1]);
    }
    set.forEach(f => {
        data.files.push({src: f, title: f});
    });
    return response;
};

const replaceFiles = (data, files) => {
    files.forEach(file => file.keys.forEach(key => set(data, key, file.path)));
    return data;
};

const replaceSrc = (resource, params, files) => {
    let data = JSON.stringify(params.data);
    files.forEach(file => file.previews.forEach(preview => data = data.replace(
        preview,
        `/static/${resource}/${params.id}/${file.path}`
    )));
    return JSON.parse(data);
};

const process = files => {
    const map = new Map();
    files.forEach(file => {
        let f = map.get(file.path);
        if (!f) {
            f = {
                ...file,
                keys: [],
                previews: []
            };
            map.set(file.path, f);
        }
        f.keys.push(file.key);
        f.previews.push(file.preview);
    });
    return Array.from(map.values());
};
