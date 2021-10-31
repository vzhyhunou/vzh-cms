import {createElement} from 'react';
import parse, {domToReact} from 'html-react-parser';

import {originByData} from './upload';
import {useComponents} from './AppContext';

export default data => {

    const components = useComponents();
    let {content, files} = data;

    const options = {
        replace: ({name, attribs, children}) => {
            const Component = components[name];
            if (Component) {
                return createElement(Component, {...attribs}, domToReact(children, options));
            }
        }
    };

    files && files.forEach(name => content = content.replace(
        new RegExp(name, 'g'),
        `${originByData('pages', data)}/${name}`
    ));

    return parse(content, options);
};
