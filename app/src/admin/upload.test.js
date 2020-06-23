import addUploadFeature from './upload'

class MockFileReader {
    readAsDataURL() {
        this.result = 'data:image/png;base64,abc'
        this.onload()
    }
}

describe('upload', () => {

    it('no files in request', () => {
        expect.assertions(2)

        const request = {
            data: {
                content: ""
            }
        }
        const expectedRequest = {
            data: {
                content: "",
                files: []
            }
        }

        const response = {}

        return addUploadFeature({
            create: (resource, params) =>
                new Promise(resolve => {
                    expect(params).toEqual(expectedRequest)
                    resolve(response)
                })
        }).create('items', request).then(r => {
            expect(r).toEqual(response)
        })
    })

    it('existing files in request', () => {
        expect.assertions(2)

        const request = {
            data: {
                files: [
                    {
                        src: "/static/origin/items/sample/900150983cd24fb0d6963f7d28e17f72.png",
                        title: "900150983cd24fb0d6963f7d28e17f72.png"
                    }
                ],
                content: ""
            }
        }
        const expectedRequest = {
            data: {
                content: "",
                files: [
                    {
                        name: "900150983cd24fb0d6963f7d28e17f72.png"
                    }
                ]
            }
        }

        const response = {}

        return addUploadFeature({
            create: (resource, params) =>
                new Promise(resolve => {
                    expect(params).toEqual(expectedRequest)
                    resolve(response)
                })
        }).create('items', request).then(r => {
            expect(r).toEqual(response)
        })
    })

    it('should modify request data', () => {
        expect.assertions(2)

        window.FileReader = MockFileReader

        const request = {
            data: {
                id: 'sample.1',
                files: [
                    {
                        rawFile: new File([], null, {
                            type: "image/png"
                        }),
                        src: "blob:http://localhost:8090/cb822ba5-8864-4d03-97c2-a798cad9c7bc"
                    },
                    {
                        rawFile: new File([], null, {
                            type: "image/png"
                        }),
                        src: "blob:http://localhost:8090/cb822ba5-8864-4d03-97c2-a798cad9c7bd"
                    }
                ],
                file: {
                    rawFile: new File([], null, {
                        type: "image/png"
                    }),
                    src: "blob:http://localhost:8090/cb822ba5-8864-4d03-97c2-a798cad9c7be"
                },
                content: "<img src=\"blob:http://localhost:8090/cb822ba5-8864-4d03-97c2-a798cad9c7bc\"/>" +
                "<img src=\"blob:http://localhost:8090/cb822ba5-8864-4d03-97c2-a798cad9c7bd\"/>" +
                "<img src=\"blob:http://localhost:8090/cb822ba5-8864-4d03-97c2-a798cad9c7bd\"/>"
            }
        }
        const expectedRequest = {
            data: {
                id: 'sample.1',
                files: [
                    {
                        data: "abc",
                        name: "900150983cd24fb0d6963f7d28e17f72.png"
                    }
                ],
                file: "900150983cd24fb0d6963f7d28e17f72.png",
                content: "<img src=\"/static/origin/items/sample/1/900150983cd24fb0d6963f7d28e17f72.png\"/>" +
                "<img src=\"/static/origin/items/sample/1/900150983cd24fb0d6963f7d28e17f72.png\"/>" +
                "<img src=\"/static/origin/items/sample/1/900150983cd24fb0d6963f7d28e17f72.png\"/>"
            }
        }

        const response = {}

        return addUploadFeature({
            create: (resource, params) =>
                new Promise(resolve => {
                    expect(params).toEqual(expectedRequest)
                    resolve(response)
                })
        }).create('items', request).then(r => {
            expect(r).toEqual(response)
        })
    })

    it('no files in response', () => {
        expect.assertions(2)

        const request = {}

        const response = {
            data: {}
        }
        const expectedResponse = {
            data: {}
        }

        return addUploadFeature({
            getOne: (resource, params) =>
                new Promise(resolve => {
                    expect(params).toEqual(request)
                    resolve(response)
                })
        }).getOne('items', request).then(r => {
            expect(r).toEqual(expectedResponse)
        })
    })

    it('should modify response item', () => {
        expect.assertions(2)

        const request = {}

        const response = {
            data: {
                id: 'sample.1',
                files: [
                    {
                        name: "900150983cd24fb0d6963f7d28e17f72.png"
                    }
                ],
                file: "900150983cd24fb0d6963f7d28e17f72.png"
            }
        }
        const expectedResponse = {
            data: {
                id: 'sample.1',
                files: [
                    {
                        src: "/static/origin/items/sample/1/900150983cd24fb0d6963f7d28e17f72.png",
                        title: "900150983cd24fb0d6963f7d28e17f72.png"
                    }
                ],
                file: {
                    src: "/static/origin/items/sample/1/900150983cd24fb0d6963f7d28e17f72.png",
                    title: "900150983cd24fb0d6963f7d28e17f72.png"
                }
            }
        }

        return addUploadFeature({
            getOne: (resource, params) =>
                new Promise(resolve => {
                    expect(params).toEqual(request)
                    resolve(response)
                })
        }).getOne('items', request).then(r => {
            expect(r).toEqual(expectedResponse)
        })
    })

    it('should modify response items', () => {
        expect.assertions(2)

        const request = {}

        const response = {
            data: [{
                id: 'sample.1',
                files: [
                    {
                        name: "900150983cd24fb0d6963f7d28e17f72.png"
                    }
                ],
                file: "900150983cd24fb0d6963f7d28e17f72.png"
            }]
        }
        const expectedResponse = {
            data: [{
                id: 'sample.1',
                files: [
                    {
                        src: "/static/origin/items/sample/1/900150983cd24fb0d6963f7d28e17f72.png",
                        title: "900150983cd24fb0d6963f7d28e17f72.png"
                    }
                ],
                file: {
                    src: "/static/origin/items/sample/1/900150983cd24fb0d6963f7d28e17f72.png",
                    title: "900150983cd24fb0d6963f7d28e17f72.png"
                }
            }]
        }

        return addUploadFeature({
            getList: (resource, params) =>
                new Promise(resolve => {
                    expect(params).toEqual(request)
                    resolve(response)
                })
        }).getList('items', request).then(r => {
            expect(r).toEqual(expectedResponse)
        })
    })
})
