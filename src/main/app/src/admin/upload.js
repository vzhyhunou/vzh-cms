import {
    CREATE,
    UPDATE,
} from 'react-admin';

const convertFileToBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file.rawFile);
});

export default requestHandler => (type, resource, params) => {
    if (type === UPDATE || type === CREATE) {

        const {files} = params.data;

        if (files && files.length) {

            const newFiles = files.filter(p => p.rawFile instanceof File);

            return Promise.all(newFiles.map(convertFileToBase64))
                .then(base64Files => base64Files.map((picture64, index) => ({
                    data: picture64.match(/,(.*)/)[1],
                    path: name(newFiles[index].rawFile)
                })))
                .then(transformedNewFiles =>
                    requestHandler(type, resource, {
                        ...params,
                        data: {
                            ...replaceSrc(resource, params, transformedNewFiles),
                            files: [
                                ...transformedNewFiles
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

const PATTERN = /[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/;

const name = rawFile => `${rawFile.preview.match(PATTERN)[0]}.${rawFile.type.split('/')[1]}`;

const replaceSrc = (resource, params, files) => {
    let s = JSON.stringify(params.data);
    files.forEach(f => s = s.replace(
        new RegExp(`\\\\[^\\\\]*${f.path.match(PATTERN)[0]}`, 'g'),
        `\\"/static/${resource}/${params.id}/${f.path}`
    ));
    return JSON.parse(s);
};
