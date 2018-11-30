const convertFileToBase64 = file =>
    new Promise((resolve, reject) => {

        const reader = new FileReader();
        const {rawFile, name} = file;

        reader.readAsDataURL(rawFile);

        reader.onload = () => resolve({
            src: reader.result.match(/,(.*)/)[1],
            name
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

            return Promise.all(newFiles.map(convertFileToBase64))
                .then(transformedNewFiles =>
                    requestHandler(type, resource, {
                        ...params,
                        data: {
                            ...params.data,
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
