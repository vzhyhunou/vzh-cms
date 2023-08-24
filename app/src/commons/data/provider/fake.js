import fakeDataProvider from 'ra-data-fakerest';

const log = (params, response) => {
    if (console.group) {
        console.groupCollapsed('exchange', JSON.stringify(params));
        console.log(response);
        console.groupEnd();
    } else {
        console.log('FakeRest request ', 'exchange', params);
        console.log('FakeRest response', response);
    }
};

const getResponse = ({pages}, locale, {path}) => {

    const p = path.split('/');

    switch (p[0]) {
        case 'pages':
            switch (p[2]) {
                case 'one':
                    const page = pages.filter(({tags}) => tags.some(({name}) => name === 'PUBLISHED'))
                        .find(({id}) => id === p[3]);
                    if (!page) {
                        return false;
                    }
                    const {id, title, content, files} = page;
                    if (!content || !content[locale]) {
                        return false;
                    }
                    return {data: {
                        id,
                        title: title && title[locale],
                        content: content[locale],
                        files: files && files.map(({name}) => name)
                    }};
                case 'menu':
                    return {data: pages.filter(({tags}) => tags.some(({name}) => name === 'MENU'))
                        .map(({id, title}) => ({
                            id,
                            title: title[locale]
                        }))
                    };
                default:
                    return false;
            }
        default:
            return false;
    }
};

export default (data, {getLocale}) => {

    const handle = params => getLocale()
        .then(locale => getResponse(data, locale, params))
        .then(response => {
            log(params, response);
            return response;
        });

    return {
        ...fakeDataProvider(data, true),
        exchange: params => handle(params),
        log
    };
};