import React from 'react';
import {Create, FormDataConsumer, FormTab, getLocale, LongTextInput, TabbedForm, TextInput} from 'react-admin';
import {connect} from 'react-redux';
import {Route} from 'react-router-dom';
import get from 'lodash/get';
import set from 'lodash/set';
import has from 'lodash/has';

import LOCALES from '../../commons/locales';
import ContentImageToolbar from '../form/ContentImageToolbar';
import {getImage} from '../reducer';
import TagsInput from '../input/TagsInput';

const PageCreate = ({locale, img, ...rest}) =>
    <Create {...rest}>
        <TabbedForm toolbar={<ContentImageToolbar/>}>
            <FormTab label="pos.general">
                <TextInput
                    source="id"
                />
                <TagsInput/>
            </FormTab>
            {Object.keys(LOCALES).map((l, i) =>
                <FormTab key={l} label={l}>
                    <TextInput
                        source={`properties.${l}.title`}
                        label={`resources.pages.fields.properties.${locale}.title`}
                    />
                    <FormDataConsumer>
                        {({formData}) =>
                            <Route exact path={`${rest.match.url}/${i + 1}`}>
                                {routeProps => {
                                    if (routeProps.match && img) {
                                        const path = ['properties', l, 'content'];
                                        set(formData, path, has(formData, path) ? `${get(formData, path)}\n${img}` : img);
                                    }
                                    return <LongTextInput
                                        source={`properties.${l}.content`}
                                        label={`resources.pages.fields.properties.${locale}.content`}
                                    />;
                                }}
                            </Route>
                        }
                    </FormDataConsumer>
                </FormTab>
            )}
        </TabbedForm>
    </Create>
;

export default connect(
    state => ({
        locale: getLocale(state),
        img: getImage(state)
    }),
    {}
)(PageCreate);