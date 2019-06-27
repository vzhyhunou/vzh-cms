import {CREATE, GET_ONE, UPDATE} from 'react-admin';
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

        const formerFiles = params.data.files ? params.data.files.filter(({rawFile}) => !rawFile) : [];
        const keys = dumpKeysRecursively(params.data).filter(key => get(params.data, `${key}.rawFile`));

        return Promise.all(keys.map(key => convertFileToBase64(get(params.data, key))))
            .then(base64Files => base64Files.map((picture64, index) => ({
                data: picture64.match(/,(.*)/)[1],
                type: picture64.match(/\/(.*);/)[1],
                key: keys[index]
            })))
            .then(base64Files => base64Files.map(({type, ...rest}) => ({
                ...rest,
                name: `${md5(rest.data)}.${type}`,
                preview: get(params.data, `${rest.key}.rawFile.preview`)
            })))
            .then(process)
            .then(transformedNewFiles =>
                requestHandler(type, resource, {
                    ...params,
                    data: {
                        ...replaceFiles(params.data, transformedNewFiles),
                        ...replaceSrc(resource, params, transformedNewFiles),
                        files: [
                            ...transformedNewFiles.map(({data, name}) => ({data, name})),
                            ...formerFiles.map(({title}) => ({name: title}))
                        ],
                    },
                })
            );
    } else if (type === GET_ONE) {

        return requestHandler(type, resource, params).then(response => {

            if (!response.data.files) return response;

            const files = response.data.files.map(({name}) => ({
                name,
                keys: dumpKeysRecursively(response.data).filter(key => get(response.data, key) === name)
            }));
            const data = analyzeFiles(resource, params.id, files, response.data);

            return {
                ...response,
                data: {
                    ...data,
                    files: data.files.map(({name}) => name)
                }
            };
        });
    }

    return requestHandler(type, resource, params);
};

const analyzeFiles = (resource, id, files, data) => {
    files.forEach(({name, keys}) => keys.forEach(key => set(data, key, {
        src: `/static/${resource}/${id}/${name}`,
        title: name
    })));
    return data;
};

const replaceFiles = (data, files) => {
    files.forEach(({name, keys}) => keys.forEach(key => set(data, key, name)));
    return data;
};

const replaceSrc = (resource, {data, id}, files) => {
    let s = JSON.stringify(data);
    files.forEach(({name, previews}) => previews.forEach(preview => s = s.replace(
        new RegExp(preview, 'g'),
        `/static/${resource}/${id}/${name}`
    )));
    return JSON.parse(s);
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
