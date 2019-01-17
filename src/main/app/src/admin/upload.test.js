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

        const rawFile = new File([], null, {
            type: "image/png"
        });
        rawFile.preview = "blob:http://localhost:8090/cb822ba5-8864-4d03-97c2-a798cad9c7bc";
        window.FileReader = MockFileReader;

        const request = {
            id: 'sample',
            data: {
                files: [
                    {
                        rawFile: rawFile
                    }
                ],
                content: "<img src=\"blob:http://localhost:8090/cb822ba5-8864-4d03-97c2-a798cad9c7bc\"/>"
            }
        };
        const expectedRequest = {
            id: 'sample',
            data: {
                files: [
                    {
                        data: "abc",
                        path: "cb822ba5-8864-4d03-97c2-a798cad9c7bc.png"
                    }
                ],
                content: "<img src=\"/static/items/sample/cb822ba5-8864-4d03-97c2-a798cad9c7bc.png\"/>"
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
                content: "<img src=\"/static/items/sample/cb822ba5-8864-4d03-97c2-a798cad9c7bc.png\"/>"
            }
        };
        const expectedResponse = {
            data: {
                files: [
                    {
                        src: "/static/items/sample/cb822ba5-8864-4d03-97c2-a798cad9c7bc.png",
                        title: "/static/items/sample/cb822ba5-8864-4d03-97c2-a798cad9c7bc.png"
                    }
                ],
                content: "<img src=\"/static/items/sample/cb822ba5-8864-4d03-97c2-a798cad9c7bc.png\"/>"
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
