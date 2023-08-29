import getDataProvider from '../commons/data/provider/fake'
import resources from '../commons/resources/fake'

const API_URL = '/api'
const ra = require('react-admin')
const localeProvider = {getLocale: () => Promise.resolve('en')}
const {exchange} = getDataProvider(resources, localeProvider)

ra.fetchUtils.fetchJson = url => exchange({path: url.slice(API_URL.length + 1)}).then(({data}) => ({json: data}))

module.exports = ra
