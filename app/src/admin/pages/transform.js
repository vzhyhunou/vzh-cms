export default ({images, files, ...rest}) => ({
    ...rest,
    files: [
        ...(files ? files : []),
        ...(images ? Object.values(images).flat() : [])
    ]
});
