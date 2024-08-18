import dump from './dump'

describe('dump', () => {

    it('test', () => {

        const obj = {
            files: [],
            file: {
                src: 'a',
                title: 'a'
            },
            collection: [
                {
                    src: 'a',
                    title: 'a'
                }
            ],
            content: {
                en: 'a'
            },
            extra: undefined,
            '@files': []
        }
        const result = [
            'files',
            'file',
            'file.src',
            'file.title',
            'collection',
            'collection.0',
            'collection.0.src',
            'collection.0.title',
            'content',
            'content.en',
            'extra',
            '@files'
        ]

        expect(dump(obj)).toEqual(result)
    })

    it('test 2', () => {

        const obj = {
            id: 'sample.1',
            tags: [
                {
                    name: 'a',
                    start: null,
                    end: null
                }
            ],
            files: [
                {
                    rawFile: {}
                },
                {
                    rawFile: {}
                },
                {
                    rawFile: {}
                }
            ],
            file: {
                rawFile: {}
            },
            content: {
                en: 'a'
            },
            '@files': {
                content: {
                    en: [
                        {
                            rawFile: {}
                        }
                    ]
                }
            }
        }
        const result = [
            'id',
            'tags',
            'tags.0',
            'tags.0.name',
            'tags.0.start',
            'tags.0.end',
            'files',
            'files.0',
            'files.0.rawFile',
            'files.1',
            'files.1.rawFile',
            'files.2',
            'files.2.rawFile',
            'file',
            'file.rawFile',
            'content',
            'content.en',
            '@files',
            '@files.content',
            '@files.content.en',
            '@files.content.en.0',
            '@files.content.en.0.rawFile'
        ]

        expect(dump(obj)).toEqual(result)
    })
})
