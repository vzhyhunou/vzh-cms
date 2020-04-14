const ra = require('react-admin');

ra.fetchUtils.fetchJson = (url, options) => {
    const p = url.split(/\/|\?/);
    return import(`./${p[2]}/${p[4]}.json`);
};

module.exports = ra;
