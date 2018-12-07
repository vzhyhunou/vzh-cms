const convertFileToBase64 = (resource, id) => file =>
    new Promise((resolve, reject) => {

        const reader = new FileReader();
        const {rawFile} = file;

        reader.readAsDataURL(rawFile);

        reader.onload = () => resolve({
            src: reader.result.match(/,(.*)/)[1],
            name: name(resource, id, rawFile)
        });
        reader.onerror = reject;
    });

export default requestHandler => (type, resource, params) => {
    if (type === 'UPDATE' || type === 'CREATE') {

        const {files} = params.data;

        if (files && files.length) {
            // only freshly dropped files are instance of File
            const formerFiles = files.filter(
                p => !(p.rawFile instanceof File)
            );
            const newFiles = files.filter(
                p => p.rawFile instanceof File
            );

            return Promise.all(newFiles.map(convertFileToBase64(resource, params.id)))
                .then(transformedNewFiles =>
                    requestHandler(type, resource, {
                        ...params,
                        data: {
                            ...replaceSrc(params.data, transformedNewFiles),
                            files: [
                                ...transformedNewFiles,
                                ...formerFiles,
                            ],
                        },
                    })
                );
        }
    }

    return requestHandler(type, resource, params);
};

const PATTERN = /[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/;

const name = (resource, id, rawFile) => `${resource}/${id}/${rawFile.preview.match(PATTERN)[0]}.${rawFile.type.split('/')[1]}`;

const replaceSrc = (data, files) => {
    let s = JSON.stringify(data);
    files.forEach(f => s = s.replace(new RegExp(`"[^"]*${f.name.match(PATTERN)[0]}`, 'g'), `"/static/files/${f.name}`));
    return JSON.parse(s);
};
