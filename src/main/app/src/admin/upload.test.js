import {CREATE, GET_ONE,} from 'react-admin';

import addUploadFeature from './upload';

class MockFileReader {
    readAsDataURL() {
        this.result = 'data:image/png;base64,abc';
        this.onload();
    }
}

describe('upload', () => {

    it('should modify request data', () => {
        expect.assertions(2);

        const rawFile1 = new File([], null, {
            type: "image/png"
        });
        rawFile1.preview = "blob:http://localhost:8090/cb822ba5-8864-4d03-97c2-a798cad9c7bc";
        const rawFile2 = new File([], null, {
            type: "image/png"
        });
        rawFile2.preview = "blob:http://localhost:8090/cb822ba5-8864-4d03-97c2-a798cad9c7bd";
        const rawFile3 = new File([], null, {
            type: "image/png"
        });
        rawFile3.preview = "blob:http://localhost:8090/cb822ba5-8864-4d03-97c2-a798cad9c7be";
        window.FileReader = MockFileReader;

        const request = {
            id: 'sample',
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
                "<img src=\"blob:http://localhost:8090/cb822ba5-8864-4d03-97c2-a798cad9c7bd\"/>"
            }
        };
        const expectedRequest = {
            id: 'sample',
            data: {
                files: [
                    {
                        data: "abc",
                        path: "900150983cd24fb0d6963f7d28e17f72.png"
                    }
                ],
                file: "900150983cd24fb0d6963f7d28e17f72.png",
                content: "<img src=\"/static/items/sample/900150983cd24fb0d6963f7d28e17f72.png\"/>" +
                "<img src=\"/static/items/sample/900150983cd24fb0d6963f7d28e17f72.png\"/>"
            }
        };

        const response = {
            data: {}
        };

        return addUploadFeature((type, resource, params) => new Promise(resolve => {
            expect(params).toEqual(expectedRequest);
            resolve(response);
        }))(CREATE, 'items', request).then(r => {
            expect(r).toEqual(response);
        });
    });

    it('should modify response data', () => {
        expect.assertions(2);

        const request = {
            data: {}
        };

        const response = {
            data: {
                files: [],
                content: "<img src=\"/static/items/sample/900150983cd24fb0d6963f7d28e17f72.png\"/>"
            }
        };
        const expectedResponse = {
            data: {
                files: [
                    {
                        src: "/static/items/sample/900150983cd24fb0d6963f7d28e17f72.png",
                        title: "/static/items/sample/900150983cd24fb0d6963f7d28e17f72.png"
                    }
                ],
                content: "<img src=\"/static/items/sample/900150983cd24fb0d6963f7d28e17f72.png\"/>"
            }
        };

        return addUploadFeature((type, resource, params) => new Promise(resolve => {
            expect(params).toEqual(request);
            resolve(response);
        }))(GET_ONE, 'items', request).then(r => {
            expect(r).toEqual(expectedResponse);
        });
    });
});