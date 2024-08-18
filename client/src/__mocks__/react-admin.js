import getProvider from '../provider/fake'

const ra = require('react-admin')
const tags = {pages: {MENU: 'MENU', PUBLISHED: 'PUBLISHED'}, users: {}}
const {dataProvider: {exchange}} = getProvider({tags})

ra.fetchUtils.fetchJson = url => exchange({path: url.replace(new RegExp('^(/api/)'), '')}).then(({data}) => ({json: data}))

module.exports = ra
