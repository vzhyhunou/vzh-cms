import React, {Children, cloneElement, Component, createContext} from 'react';
import {connect} from 'react-redux';
import {change, formValueSelector} from 'redux-form';
import {REDUX_FORM_NAME} from 'react-admin';

import locales from '../locales';

const EditionContext = createContext();

class EditionProvider extends Component {

    addImageToContent = value => {

        const {change, name, content} = this.props;

        change(REDUX_FORM_NAME, name, content ? `${content}\n${value}` : value);
    };

    render() {

        const {children, ...rest} = this.props;

        return <EditionContext.Provider value={{
            addImageToContent: this.addImageToContent
        }}>
            {Children.map(children, e => cloneElement(e, {...rest}))}
        </EditionContext.Provider>;
    }
}

export const withEdition = Component => props =>
    <EditionContext.Consumer>
        {state => <Component {...props} {...state}/>}
    </EditionContext.Consumer>
;

const selector = formValueSelector(REDUX_FORM_NAME);

const mapStateToProps = state => {

    const {location} = state.router;
    if (!location) return {};

    const name = `properties.${Object.keys(locales)[location.pathname.split('/')[3] - 1]}.content`;
    return {name, content: selector(state, name)};
};

export default connect(
    mapStateToProps,
    {change}
)(EditionProvider);
