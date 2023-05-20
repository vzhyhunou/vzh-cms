import data, {dataRestProvider, getResponse} from '../data'

const apiUrl = '/api/'
const ra = require('react-admin')
const provider = dataRestProvider(data, getResponse(() => 'en'))

ra.fetchUtils.fetchJson = (url, options) => {
    console.log(url, options)
    return provider.exchange({path: url.startsWith(apiUrl) ? url.slice(apiUrl.length) : url})
        .then(({data}) => ({json: data}))
}

module.exports = ra
