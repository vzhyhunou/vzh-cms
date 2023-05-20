export default data => process.env.REACT_APP_DATA ? data().then(r => ({...r, data: r.default})) : Promise.resolve({});
