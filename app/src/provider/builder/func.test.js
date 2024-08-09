import getFuncProvider from './func'

describe('functions', () => {

    it('path by data', () =>
        expect(getFuncProvider().pathByData('t', 'r', {parents: [1, '2.3'], id: 'a.b'}, 'c'))
            .toEqual('/static/t/r/1/2/3/a/b/c'))

    it('origin by data no param', () =>
        expect(getFuncProvider().originByData('r', {parents: [1, '2.3'], id: 'a.b'}, 'c'))
            .toEqual('/static/origin/r/1/2/3/a/b/c'))

    it('origin by data no context', () =>
        expect(getFuncProvider({}).originByData('r', {parents: [1, '2.3'], id: 'a.b'}, 'c'))
            .toEqual('/static/origin/r/1/2/3/a/b/c'))

    it('origin by data', () =>
        expect(getFuncProvider({basename: 'b'}).originByData('r', {parents: [1, '2.3'], id: 'a.b'}, 'c'))
            .toEqual('b/static/origin/r/1/2/3/a/b/c'))
})
