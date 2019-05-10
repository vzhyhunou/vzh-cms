import React, {createContext} from 'react';
import {connect} from 'react-redux';
import {change, formValueSelector} from 'redux-form';
import {REDUX_FORM_NAME} from 'react-admin';
import compose from 'recompose/compose';

import {withTranslation} from '../commons/TranslationContext';

const EditionContext = createContext();

const EditionProvider = ({change, name, content, children}) => {

    const addImageToContent = value => change(REDUX_FORM_NAME, name, content ? `${content}\n${value}` : value);

    return <EditionContext.Provider value={{
        addImageToContent
    }}>
        {children}
    </EditionContext.Provider>;
};

export const withEdition = Component => props =>
    <EditionContext.Consumer>
        {state => <Component {...props} {...state}/>}
    </EditionContext.Consumer>
;

const selector = formValueSelector(REDUX_FORM_NAME);

const mapStateToProps = (state, {locales}) => {

    const {location} = state.router;
    if (!location) return {};

    const name = `properties.${Object.keys(locales)[location.pathname.split('/')[3] - 1]}.content`;
    return {
        name,
        content: selector(state, name)
    };
};

export default compose(
    withTranslation,
    connect(
        mapStateToProps,
        {change}
    )
)(EditionProvider);
