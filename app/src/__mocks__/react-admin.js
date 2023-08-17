import getDataProvider from '../commons/data/fake'
import source from '../commons/resources/fake'

const API_URL = '/api'
const ra = require('react-admin')
const {exchange} = getDataProvider(source, {getLocale: () => Promise.resolve('en')})

ra.fetchUtils.fetchJson = (url, options) => {
    console.log(url, options)
    return exchange({path: url.startsWith(API_URL) ? url.slice(API_URL.length + 1) : url})
        .then(({data}) => ({json: data}))
}

module.exports = ra
