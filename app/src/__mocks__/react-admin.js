import getDataProvider from '../commons/data/provider/fake'
import source from '../commons/resources/fake'

const API_URL = '/api'
const ra = require('react-admin')
const {exchange} = getDataProvider(source, {getLocale: () => Promise.resolve('en')})

ra.fetchUtils.fetchJson = url => exchange({path: url.slice(API_URL.length + 1)}).then(({data}) => ({json: data}))

module.exports = ra
