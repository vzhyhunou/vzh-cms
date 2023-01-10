import addUploadFeature from './upload'

class FileReaderMock {
    readAsDataURL({type}) {
        this.result = `data:image/png;base64,${type}`
        this.onload()
    }
}
global.FileReader = FileReaderMock

describe('upload', () => {

    it('no files in request', () => {
        expect.assertions(2)

        const request = {
            data: {
            }
        }
        const expectedRequest = {
            data: {
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
                        src: "/static/origin/items/sample/900150983cd24fb0d6963f7d28e17f71.png",
                        title: "900150983cd24fb0d6963f7d28e17f71.png"
                    },
                    {
                        src: "/static/origin/items/sample/900150983cd24fb0d6963f7d28e17f72.png",
                        title: "900150983cd24fb0d6963f7d28e17f72.png"
                    },
                    {
                        src: "/static/origin/items/sample/900150983cd24fb0d6963f7d28e17f73.png",
                        title: "900150983cd24fb0d6963f7d28e17f73.png"
                    }
                ],
                file: {
                    src: "/static/origin/items/sample/900150983cd24fb0d6963f7d28e17f72.png",
                    title: "900150983cd24fb0d6963f7d28e17f72.png"
                },
                collection: [
                    {
                        src: "/static/origin/items/sample/900150983cd24fb0d6963f7d28e17f72.png",
                        title: "900150983cd24fb0d6963f7d28e17f72.png"
                    }
                ],
                content: {
                    en: "<img src=\"900150983cd24fb0d6963f7d28e17f71.png\"/>"
                },
                extra: undefined,
                "@files": {
                    content: {
                        en: [
                            {
                                src: "/static/origin/items/sample/1/900150983cd24fb0d6963f7d28e17f73.png",
                                title: "900150983cd24fb0d6963f7d28e17f73.png"
                            }
                        ]
                    }
                }
            }
        }
        const expectedRequest = {
            data: {
                files: [
                    {
                        name: "900150983cd24fb0d6963f7d28e17f71.png"
                    },
                    {
                        name: "900150983cd24fb0d6963f7d28e17f72.png"
                    }
                ],
                file: "900150983cd24fb0d6963f7d28e17f72.png",
                collection: [
                    "900150983cd24fb0d6963f7d28e17f72.png"
                ],
                content: {
                    en: "<img src=\"900150983cd24fb0d6963f7d28e17f71.png\"/>"
                }
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

        const request = {
            data: {
                id: "sample.1",
                files: [
                    {
                        rawFile: new File([], "abc", {type: 'abc'})
                    },
                    {
                        rawFile: new File([], "abd", {type: 'abc'})
                    },
                    {
                        rawFile: new File([], "abe", {type: 'abe'})
                    }
                ],
                file: {
                    rawFile: new File([], "abf", {type: 'abf'})
                },
                content: {
                    en: "<img src=\"abc\"/>" +
                    "<img src=\"abd\"/>" +
                    "<img src=\"abd\"/>" +
                    "<img src=\"abg\"/>"
                },
                "@files": {
                    content: {
                        en: [
                            {
                                rawFile: new File([], "abg", {type: 'abg'})
                            }
                        ]
                    }
                }
            }
        }
        const expectedRequest = {
            data: {
                id: "sample.1",
                files: [
                    {
                        data: "abc",
                        name: "900150983cd24fb0d6963f7d28e17f72.png"
                    },
                    {
                        data: "abf",
                        name: "ff905c528ce7ce9e64c0758b54855b50.png"
                    },
                    {
                        data: "abg",
                        name: "894852696ee75656ba33c03041b1fa7f.png"
                    }
                ],
                file: "ff905c528ce7ce9e64c0758b54855b50.png",
                content: {
                    en: "<img src=\"900150983cd24fb0d6963f7d28e17f72.png\"/>" +
                    "<img src=\"900150983cd24fb0d6963f7d28e17f72.png\"/>" +
                    "<img src=\"900150983cd24fb0d6963f7d28e17f72.png\"/>" +
                    "<img src=\"894852696ee75656ba33c03041b1fa7f.png\"/>"
                }
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

    it('should modify request data with existing files in request', () => {
        expect.assertions(2)

        const request = {
            data: {
                id: "sample.1",
                files: [
                    {
                        src: "/static/origin/items/sample/1/900150983cd24fb0d6963f7d28e17f71.png",
                        title: "900150983cd24fb0d6963f7d28e17f71.png"
                    },
                    {
                        rawFile: new File([], "abc", {type: 'abc'})
                    },
                    {
                        rawFile: new File([], "abd", {type: 'abc'})
                    },
                    {
                        rawFile: new File([], "abe", {type: 'abe'})
                    }
                ],
                file: {
                    rawFile: new File([], "abf", {type: 'abf'})
                },
                content: {
                    en: "<img src=\"900150983cd24fb0d6963f7d28e17f71.png\"/>" +
                    "<img src=\"abc\"/>" +
                    "<img src=\"abd\"/>" +
                    "<img src=\"abd\"/>"
                }
            }
        }
        const expectedRequest = {
            data: {
                id: "sample.1",
                files: [
                    {
                        data: "abc",
                        name: "900150983cd24fb0d6963f7d28e17f72.png"
                    },
                    {
                        data: "abf",
                        name: "ff905c528ce7ce9e64c0758b54855b50.png"
                    },
                    {
                        name: "900150983cd24fb0d6963f7d28e17f71.png"
                    }
                ],
                file: "ff905c528ce7ce9e64c0758b54855b50.png",
                content: {
                    en: "<img src=\"900150983cd24fb0d6963f7d28e17f71.png\"/>" +
                    "<img src=\"900150983cd24fb0d6963f7d28e17f72.png\"/>" +
                    "<img src=\"900150983cd24fb0d6963f7d28e17f72.png\"/>" +
                    "<img src=\"900150983cd24fb0d6963f7d28e17f72.png\"/>"
                }
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

    it('should modify request data with parents', () => {
        expect.assertions(2)

        const request = {
            data: {
                id: "sample.1",
                parents: [2, "3.4"],
                files: [
                    {
                        rawFile: new File([], "abc", {type: 'abc'})
                    },
                    {
                        rawFile: new File([], "abd", {type: 'abc'})
                    },
                    {
                        rawFile: new File([], "abe", {type: 'abe'})
                    }
                ],
                file: {
                    rawFile: new File([], "abf", {type: 'abf'})
                },
                content: {
                    en: "<img src=\"abc\"/>" +
                    "<img src=\"abd\"/>" +
                    "<img src=\"abd\"/>"
                }
            }
        }
        const expectedRequest = {
            data: {
                id: "sample.1",
                parents: [2, "3.4"],
                files: [
                    {
                        data: "abc",
                        name: "900150983cd24fb0d6963f7d28e17f72.png"
                    },
                    {
                        data: "abf",
                        name: "ff905c528ce7ce9e64c0758b54855b50.png"
                    }
                ],
                file: "ff905c528ce7ce9e64c0758b54855b50.png",
                content: {
                    en: "<img src=\"900150983cd24fb0d6963f7d28e17f72.png\"/>" +
                    "<img src=\"900150983cd24fb0d6963f7d28e17f72.png\"/>" +
                    "<img src=\"900150983cd24fb0d6963f7d28e17f72.png\"/>"
                }
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
                id: "sample.1",
                files: [
                    {
                        name: "900150983cd24fb0d6963f7d28e17f72.png"
                    },
                    {
                        name: "900150983cd24fb0d6963f7d28e17f73.png"
                    }
                ],
                file: "900150983cd24fb0d6963f7d28e17f72.png",
                content: {
                    en: "<img src=\"900150983cd24fb0d6963f7d28e17f73.png\"/>"
                }
            }
        }
        const expectedResponse = {
            data: {
                id: "sample.1",
                files: [
                    {
                        src: "/static/origin/items/sample/1/900150983cd24fb0d6963f7d28e17f72.png",
                        title: "900150983cd24fb0d6963f7d28e17f72.png"
                    },
                    {
                        src: "/static/origin/items/sample/1/900150983cd24fb0d6963f7d28e17f73.png",
                        title: "900150983cd24fb0d6963f7d28e17f73.png"
                    }
                ],
                file: {
                    src: "/static/origin/items/sample/1/900150983cd24fb0d6963f7d28e17f72.png",
                    title: "900150983cd24fb0d6963f7d28e17f72.png"
                },
                content: {
                    en: "<img src=\"900150983cd24fb0d6963f7d28e17f73.png\"/>"
                },
                "@files": {
                    content: {
                        en: [
                            {
                                src: "/static/origin/items/sample/1/900150983cd24fb0d6963f7d28e17f73.png",
                                title: "900150983cd24fb0d6963f7d28e17f73.png"
                            }
                        ]
                    }
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

    it('should modify response item with parents', () => {
        expect.assertions(2)

        const request = {}

        const response = {
            data: {
                id: "sample.1",
                parents: [2, "3.4"],
                files: [
                    {
                        name: "900150983cd24fb0d6963f7d28e17f72.png"
                    },
                    {
                        name: "900150983cd24fb0d6963f7d28e17f73.png"
                    }
                ],
                file: "900150983cd24fb0d6963f7d28e17f72.png",
                content: {
                    en: "<img src=\"900150983cd24fb0d6963f7d28e17f73.png\"/>"
                }
            }
        }
        const expectedResponse = {
            data: {
                id: "sample.1",
                parents: [2, "3.4"],
                files: [
                    {
                        src: "/static/origin/items/2/3/4/sample/1/900150983cd24fb0d6963f7d28e17f72.png",
                        title: "900150983cd24fb0d6963f7d28e17f72.png"
                    },
                    {
                        src: "/static/origin/items/2/3/4/sample/1/900150983cd24fb0d6963f7d28e17f73.png",
                        title: "900150983cd24fb0d6963f7d28e17f73.png"
                    }
                ],
                file: {
                    src: "/static/origin/items/2/3/4/sample/1/900150983cd24fb0d6963f7d28e17f72.png",
                    title: "900150983cd24fb0d6963f7d28e17f72.png"
                },
                content: {
                    en: "<img src=\"900150983cd24fb0d6963f7d28e17f73.png\"/>"
                },
                "@files": {
                    content: {
                        en: [
                            {
                                src: "/static/origin/items/2/3/4/sample/1/900150983cd24fb0d6963f7d28e17f73.png",
                                title: "900150983cd24fb0d6963f7d28e17f73.png"
                            }
                        ]
                    }
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
                id: "sample.1",
                files: [
                    {
                        name: "900150983cd24fb0d6963f7d28e17f72.png"
                    },
                    {
                        name: "900150983cd24fb0d6963f7d28e17f73.png"
                    }
                ],
                file: "900150983cd24fb0d6963f7d28e17f72.png",
                content: {
                    en: "<img src=\"900150983cd24fb0d6963f7d28e17f73.png\"/>"
                }
            }]
        }
        const expectedResponse = {
            data: [{
                id: "sample.1",
                files: [
                    {
                        src: "/static/origin/items/sample/1/900150983cd24fb0d6963f7d28e17f72.png",
                        title: "900150983cd24fb0d6963f7d28e17f72.png"
                    },
                    {
                        src: "/static/origin/items/sample/1/900150983cd24fb0d6963f7d28e17f73.png",
                        title: "900150983cd24fb0d6963f7d28e17f73.png"
                    }
                ],
                file: {
                    src: "/static/origin/items/sample/1/900150983cd24fb0d6963f7d28e17f72.png",
                    title: "900150983cd24fb0d6963f7d28e17f72.png"
                },
                content: {
                    en: "<img src=\"900150983cd24fb0d6963f7d28e17f73.png\"/>"
                },
                "@files": {
                    content: {
                        en: [
                            {
                                src: "/static/origin/items/sample/1/900150983cd24fb0d6963f7d28e17f73.png",
                                title: "900150983cd24fb0d6963f7d28e17f73.png"
                            }
                        ]
                    }
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

    it('should modify response items with parents', () => {
        expect.assertions(2)

        const request = {}

        const response = {
            data: [{
                id: "sample.1",
                parents: [2, "3.4"],
                files: [
                    {
                        name: "900150983cd24fb0d6963f7d28e17f72.png"
                    },
                    {
                        name: "900150983cd24fb0d6963f7d28e17f73.png"
                    }
                ],
                file: "900150983cd24fb0d6963f7d28e17f72.png",
                content: {
                    en: "<img src=\"900150983cd24fb0d6963f7d28e17f73.png\"/>"
                }
            }]
        }
        const expectedResponse = {
            data: [{
                id: "sample.1",
                parents: [2, "3.4"],
                files: [
                    {
                        src: "/static/origin/items/2/3/4/sample/1/900150983cd24fb0d6963f7d28e17f72.png",
                        title: "900150983cd24fb0d6963f7d28e17f72.png"
                    },
                    {
                        src: "/static/origin/items/2/3/4/sample/1/900150983cd24fb0d6963f7d28e17f73.png",
                        title: "900150983cd24fb0d6963f7d28e17f73.png"
                    }
                ],
                file: {
                    src: "/static/origin/items/2/3/4/sample/1/900150983cd24fb0d6963f7d28e17f72.png",
                    title: "900150983cd24fb0d6963f7d28e17f72.png"
                },
                content: {
                    en: "<img src=\"900150983cd24fb0d6963f7d28e17f73.png\"/>"
                },
                "@files": {
                    content: {
                        en: [
                            {
                                src: "/static/origin/items/2/3/4/sample/1/900150983cd24fb0d6963f7d28e17f73.png",
                                title: "900150983cd24fb0d6963f7d28e17f73.png"
                            }
                        ]
                    }
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
