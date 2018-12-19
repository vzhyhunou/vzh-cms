const convertFileToBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file.rawFile);
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
});

export default requestHandler => (type, resource, params) => {
    if (type === 'UPDATE' || type === 'CREATE') {

        const {files} = params.data;

        if (files && files.length) {

            //const formerFiles = files.filter(p => !(p.rawFile instanceof File));
            const newFiles = files.filter(p => p.rawFile instanceof File);

            return Promise.all(newFiles.map(convertFileToBase64))
                .then(base64Files => base64Files.map((picture64, index) => ({
                    src: picture64.match(/,(.*)/)[1],
                    name: `${resource}/${params.id}/${name(newFiles[index].rawFile)}`
                })))
                .then(transformedNewFiles =>
                    requestHandler(type, resource, {
                        ...params,
                        data: {
                            ...replaceSrc(params.data, transformedNewFiles),
                            files: [
                                ...transformedNewFiles,
                                //...formerFiles,
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

const replaceSrc = (data, files) => {
    let s = JSON.stringify(data);
    files.forEach(f => s = s.replace(new RegExp(`"[^"]*${f.name.match(PATTERN)[0]}`, 'g'), `"/static/${f.name}`));
    return JSON.parse(s);
};
