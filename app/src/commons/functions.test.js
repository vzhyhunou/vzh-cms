import functions from './functions'

describe('functions', () => {

    it('path by data', () =>
        expect(functions().pathByData({parents: [1, '2.3'], id: 'a.b'}))
            .toEqual('1/2/3/a/b'))

    it('origin by data', () =>
        expect(functions('base').originByData('res', {parents: [1, '2.3'], id: 'a.b'}))
            .toEqual('base/static/origin/res/1/2/3/a/b'))
})
