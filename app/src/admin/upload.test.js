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
            id: 'sample',
            data: {
                content: ""
            }
        }
        const expectedRequest = {
            id: 'sample',
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
            id: 'sample',
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
            id: 'sample',
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

        const rawFile1 = new File([], null, {
            type: "image/png"
        })
        rawFile1.preview = "blob:http://localhost:8090/cb822ba5-8864-4d03-97c2-a798cad9c7bc"
        const rawFile2 = new File([], null, {
            type: "image/png"
        })
        rawFile2.preview = "blob:http://localhost:8090/cb822ba5-8864-4d03-97c2-a798cad9c7bd"
        const rawFile3 = new File([], null, {
            type: "image/png"
        })
        rawFile3.preview = "blob:http://localhost:8090/cb822ba5-8864-4d03-97c2-a798cad9c7be"
        window.FileReader = MockFileReader

        const request = {
            id: 'sample.1',
            data: {
                files: [
                    {
                        rawFile: rawFile1
                    },
                    {
                        rawFile: rawFile2
                    }
                ],
                file: {
                    rawFile: rawFile3
                },
                content: "<img src=\"blob:http://localhost:8090/cb822ba5-8864-4d03-97c2-a798cad9c7bc\"/>" +
                "<img src=\"blob:http://localhost:8090/cb822ba5-8864-4d03-97c2-a798cad9c7bd\"/>" +
                "<img src=\"blob:http://localhost:8090/cb822ba5-8864-4d03-97c2-a798cad9c7bd\"/>"
            }
        }
        const expectedRequest = {
            id: 'sample.1',
            data: {
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
