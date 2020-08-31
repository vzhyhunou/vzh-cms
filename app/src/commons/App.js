import React from 'react';

import AppProvider from './AppContext';
import App from '../admin/App';

export default ({locales, i18n, ...rest}) =>
    <AppProvider {...{locales, i18n}}>
        <App {...rest}/>
    </AppProvider>
;
