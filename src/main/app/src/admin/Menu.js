import React from 'react';
import {getResources, MenuItemLink, Responsive} from 'react-admin';
import {connect} from 'react-redux';
import SettingsIcon from '@material-ui/icons/Settings';
import compose from 'recompose/compose';

import {withTranslation} from '../commons/TranslationContext';

const Menu = ({resources, onMenuClick, translate, logout}) =>
    <div>
        {resources.map(resource =>
            <MenuItemLink
                key={resource.name}
                to={`/${resource.name}`}
                primaryText={translate(`resources.${resource.name}.name`)}
                leftIcon={<resource.icon/>}
                onClick={onMenuClick}
            />
        )}
        <MenuItemLink
            to="/configuration"
            primaryText={translate('pos.configuration')}
            leftIcon={<SettingsIcon/>}
            onClick={onMenuClick}
        />
        <Responsive xsmall={logout} medium={null}/>
    </div>
;

export default compose(
    connect(
        state => ({
            resources: getResources(state)
        }),
        {}
    ),
    withTranslation
)(Menu);
