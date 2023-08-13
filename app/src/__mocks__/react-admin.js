import getDataProvider from '../commons/data/fake'
import source from '../commons/resources/fake'

const apiUrl = '/api/'
const ra = require('react-admin')
const dataProvider = getDataProvider(source, {getLocale: () => 'en'})

ra.fetchUtils.fetchJson = (url, options) => {
    console.log(url, options)
    return dataProvider.exchange({path: url.startsWith(apiUrl) ? url.slice(apiUrl.length) : url})
        .then(({data}) => ({json: data}))
}

module.exports = ra
