import getFuncProvider from './func'

describe('functions', () => {

    it('path by data', () =>
        expect(getFuncProvider().pathByData('t', 'r', {parents: [1, '2.3'], id: 'a.b'}))
            .toEqual('/static/t/r/1/2/3/a/b'))

    it('origin by data no param', () =>
        expect(getFuncProvider().originByData('r', {parents: [1, '2.3'], id: 'a.b'}))
            .toEqual('/static/origin/r/1/2/3/a/b'))

    it('origin by data no context', () =>
        expect(getFuncProvider({}).originByData('r', {parents: [1, '2.3'], id: 'a.b'}))
            .toEqual('/static/origin/r/1/2/3/a/b'))

    it('origin by data', () =>
        expect(getFuncProvider({basename: 'b'}).originByData('r', {parents: [1, '2.3'], id: 'a.b'}))
            .toEqual('b/static/origin/r/1/2/3/a/b'))
})
