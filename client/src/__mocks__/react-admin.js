import getProvider from '../provider/fake'

const ra = require('react-admin')
const {dataProvider: {exchange}} = getProvider({resources: {pages: {tags: {PUBLISHED: 'PUBLISHED'}}}})

ra.fetchUtils.fetchJson = url => exchange({path: url.replace(new RegExp('^(/api/)'), '')}).then(({data}) => ({json: data}))

module.exports = ra