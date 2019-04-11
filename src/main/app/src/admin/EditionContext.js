import React, {Component, createContext} from 'react';
import {connect} from 'react-redux';
import {change, formValueSelector} from 'redux-form';
import {REDUX_FORM_NAME} from 'react-admin';
import compose from 'recompose/compose';

import {withTranslation} from '../commons/TranslationContext';

const EditionContext = createContext();

class EditionProvider extends Component {

    addImageToContent = value => {

        const {change, name, content} = this.props;

        change(REDUX_FORM_NAME, name, content ? `${content}\n${value}` : value);
    };

    render() {

        const {children} = this.props;

        return <EditionContext.Provider value={{
            addImageToContent: this.addImageToContent
        }}>
            {children}
        </EditionContext.Provider>;
    }
}

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
    return {name, content: selector(state, name)};
};

export default compose(
    withTranslation,
    connect(
        mapStateToProps,
        {change}
    )
)(EditionProvider);