import React, {memo} from 'react';
import JsxParser from 'react-jsx-parser';

import {originByData} from './upload';
import {useComponents} from './AppContext';

export default memo(data => {

    const components = useComponents();
    let {content, files} = data;

    files && files.forEach(name => content = content.replace(
        new RegExp(name, 'g'),
        `${originByData('pages', data)}/${name}`
    ));

    return <JsxParser
        {...{components}}
        jsx={content}
    />;
});
