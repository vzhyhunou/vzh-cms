import {createElement} from 'react';
import parse, {domToReact} from 'html-react-parser';

import {originByData} from '../commons/upload';

export default ({data, internal, components}) => {

    let {title, content, files} = data;

    if (!internal) {
        document.title = title;
    }

    const options = {
        replace: ({name, attribs, children}) => {
            const Component = components[name];
            if (Component) {
                return createElement(Component, {...attribs, internal: true, components}, domToReact(children, options));
            }
        }
    };

    files && files.forEach(name => content = content.replace(
        new RegExp(name, 'g'),
        `${originByData('pages', data)}/${name}`
    ));

    return parse(content, options);
};
