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

export const getFakeResponse = ({pages}, getLocale, {path}) => {

    const locale = getLocale();
    const p = path.split('/');

    switch (p[0]) {
        case 'pages':
            switch (p[2]) {
                case 'one':
                    const page = pages.find(({id}) => id === p[3]);
                    if (!page) {
                        return false;
                    }
                    const {id, title, content, files} = page;
                    return {data: content && content[locale] && {
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

export const getFakeData = getResponse => (data, getLocale) => {

    const handle = params => {
        let response;
        try {
            response = getResponse(data, getLocale, params);
        } catch (error) {
            console.error(error);
            return Promise.reject(error);
        }
        log(params, response);
        return Promise.resolve(response);
    };

    return {
        ...fakeDataProvider(data, true),
        exchange: params => handle(params)
    };
};

export default getFakeData(getFakeResponse);