import getDataProvider from '../commons/data/provider/fake'
import resProvider from '../commons/resources/fake'

const API_URL = '/api'
const ra = require('react-admin')
const tags = {pages: {MENU: 'MENU', PUBLISHED: 'PUBLISHED'}, users: {}}
const localeProvider = {getLocale: () => Promise.resolve('en')}
const authProvider = {getPermissions: () => Promise.resolve()}
const {exchange} = getDataProvider({resProvider, tags, localeProvider, authProvider})

ra.fetchUtils.fetchJson = url => exchange({path: url.slice(API_URL.length + 1)}).then(({data}) => ({json: data}))

module.exports = ra
