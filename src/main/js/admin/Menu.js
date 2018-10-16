import React from 'react';
import {getResources, MenuItemLink, translate} from 'react-admin';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import SettingsIcon from '@material-ui/icons/Settings';
import compose from 'recompose/compose';

const Menu = ({resources, onMenuClick, translate}) =>
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
    </div>
;

export default compose(
    withRouter,
    connect(
        state => ({
            resources: getResources(state)
        }),
        {}
    ),
    translate
)(Menu);
