import { createElement } from 'react';
import {
    useResourceContext,
    useTranslate
} from 'react-admin';

import { useContextProvider } from '../..';

export default ({component, sources, ...props}) => {

    const translate = useTranslate();
    const resource = useResourceContext();
    const {resources} = useContextProvider();

    return createElement(component, {
        ...props,
        label: `resources.${resource}.fields.${props.source}`,
        choices: Object.keys(resources[resource][sources]).map(key => ({
            id: key,
            name: translate(`resources.${resource}.${sources}.${key}`)
        }))
    });
};