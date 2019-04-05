import React, {Children, cloneElement, Component, createContext} from 'react';
import Polyglot from 'node-polyglot';

import {i18nLoader, i18nWriter} from './locale';

const TranslationContext = createContext();

export default class extends Component {

    updateLocale = locale => {
        i18nWriter(locale).then(messages => {

            const {locales} = this.props;
            const polyglot = new Polyglot({
                locale,
                phrases: messages
            });
            this.setState({
                contextValues: {
                    locale,
                    messages,
                    translate: polyglot.t.bind(polyglot),
                    locales
                }
            });
        });
    };

    componentDidMount() {
        i18nLoader(l => import(`./i18n/${l}`)).then(({locale, messages}) => {

            const {locales} = this.props;
            const polyglot = new Polyglot({
                locale,
                phrases: messages
            });
            this.setState({
                contextValues: {
                    locale,
                    messages,
                    translate: polyglot.t.bind(polyglot),
                    locales
                }
            });
        });
    }

    render() {
        if (!this.state)
            return <div/>;

        const {children, ...rest} = this.props;
        const {contextValues} = this.state;

        return <TranslationContext.Provider value={{
            ...contextValues,
            updateLocale: this.updateLocale
        }}>
            {Children.map(children, e => cloneElement(e, {...rest}))}
        </TranslationContext.Provider>;
    }
}

export const withTranslation = Component => props =>
    <TranslationContext.Consumer>
        {({updateLocale, ...state}) => <Component {...props} {...state}/>}
    </TranslationContext.Consumer>
;

export const withTranslationUpdate = Component => props =>
    <TranslationContext.Consumer>
        {state => <Component {...props} {...state}/>}
    </TranslationContext.Consumer>
;
