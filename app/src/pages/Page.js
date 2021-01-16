import React, {createElement} from 'react';
import parse, {domToReact} from 'html-react-parser';
import App from './App';

export default ({title, content, internal, components}) => {

    if (!internal) {
        document.title = title;
    }

    const options = {
        replace: ({name, attribs, children}) => {
            const Component = components[name];
            if (Component) {
                return <>
                    {createElement(Component, {...attribs, internal: true, components}, domToReact(children, options))}
                    {Component === App && domToReact(children, options)}
                </>;
            }
        }
    };

    return <>
        {parse(content, options)}
    </>;
};
