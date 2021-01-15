import React, {createElement, Suspense} from 'react';
import parse, {domToReact} from 'html-react-parser';

export default ({title, content, internal, components}) => {

    if (!internal) {
        document.title = title;
    }

    const options = {
        replace: ({name, attribs, children}) => {
            const Component = components[name];
            if (Component) {
                return <Suspense fallback={<div>Loading...</div>}>
                    {createElement(Component, {...attribs, internal: true, components})}
                    {domToReact(children, options)}
                </Suspense>;
            }
        }
    };
    return <>
        {parse(content, options)}
    </>;
};
