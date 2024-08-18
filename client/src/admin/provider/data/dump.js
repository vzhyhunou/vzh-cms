const dump = (obj, s = '') => Object.entries(obj)
    .reduce((product, [k, v]) => {
        const key =  s ? `${s}.${k}` : k;
        if (Array.isArray(v)) {
            return product.concat(dump({[key]: Object.fromEntries(v.map((v, i) => [i, v]))}));
        }
        return v && typeof v === 'object' ? product.concat(key).concat(dump(v, key)) : product.concat(key);
    }, []);

export default dump;