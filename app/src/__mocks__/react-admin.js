const ra = require('react-admin')

ra.fetchUtils.fetchJson = (url, options) => {
    console.log(url, options)
    const path = url.split(/\/|\?/)
    const name = `./${path[2]}/${path.slice(4).join('/').replace(/\./g, '/')}.json`
    console.log(name)
    return import(name)
}

module.exports = ra
