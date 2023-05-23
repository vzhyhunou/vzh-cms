import fake from '../commons/data/fake'

const apiUrl = '/api/'
const ra = require('react-admin')
const dataProvider = fake.data(() => 'en')

ra.fetchUtils.fetchJson = (url, options) => {
    console.log(url, options)
    return dataProvider.exchange({path: url.startsWith(apiUrl) ? url.slice(apiUrl.length) : url})
        .then(({data}) => ({json: data}))
}

module.exports = ra
