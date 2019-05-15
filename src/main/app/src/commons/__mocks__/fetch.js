export default {
    fetchJson: (url, options) => {
        const p = url.split(/\/|\?/);
        return import(`./${p[2]}/${p[4]}.json`);
    }
};
