import React from 'react';

import AppProvider from './AppContext';
import App from '../admin/App';

export default ({locales, i18n, components, ...rest}) =>
    <AppProvider {...{locales, i18n, components}}>
        <App {...rest}/>
    </AppProvider>
;
