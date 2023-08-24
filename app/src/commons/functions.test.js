import getFuncProvider from './functions'

describe('functions', () => {

    it('path by data', () =>
        expect(getFuncProvider().pathByData({parents: [1, '2.3'], id: 'a.b'}))
            .toEqual('1/2/3/a/b'))

    it('origin by data', () =>
        expect(getFuncProvider('base').originByData('res', {parents: [1, '2.3'], id: 'a.b'}))
            .toEqual('base/static/origin/res/1/2/3/a/b'))
})
