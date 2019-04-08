import React, {Component, createContext} from 'react';
import Polyglot from 'node-polyglot';

import {i18nLoader, i18nWriter} from './locale';

const TranslationContext = createContext();

export default class extends Component {

    componentDidMount() {

        const {locales, i18n} = this.props;

        i18nLoader(i18n).then(({locale, messages}) => {

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

    updateLocale = locale => {

        const {locales, i18n} = this.props;

        i18nWriter(i18n, locale).then(messages => {

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

    getLocale = () => this.state.contextValues.locale;

    getMessages = locale => {

        const {i18n} = this.props;

        return i18nWriter(i18n, locale);
    };

    render() {
        if (!this.state)
            return <div/>;

        const {children} = this.props;
        const {contextValues} = this.state;

        return <TranslationContext.Provider value={{
            ...contextValues,
            updateLocale: this.updateLocale,
            getLocale: this.getLocale,
            getMessages: this.getMessages
        }}>
            {children}
        </TranslationContext.Provider>;
    }
}

export const withTranslation = Component => props =>
    <TranslationContext.Consumer>
        {({updateLocale, getLocale, getMessages, ...state}) => <Component {...props} {...state}/>}
    </TranslationContext.Consumer>
;

export const withTranslationUpdate = Component => props =>
    <TranslationContext.Consumer>
        {state => <Component {...props} {...state}/>}
    </TranslationContext.Consumer>
;
