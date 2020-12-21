import React from 'react';
import {getResources, MenuItemLink, useTranslate} from 'react-admin';
import {useSelector} from 'react-redux';
import {useMediaQuery} from '@material-ui/core';
import SettingsIcon from '@material-ui/icons/Settings';

export default ({onMenuClick, logout}) => {

    const translate = useTranslate();
    const isXSmall = useMediaQuery(theme => theme.breakpoints.down('xs'));
    const open = useSelector(state => state.admin.ui.sidebarOpen);
    const resources = useSelector(getResources);

    document.title = translate('pos.title');

    return <>
        {resources.filter(resource => resource.hasList).map(resource =>
            <MenuItemLink
                key={resource.name}
                to={`/${resource.name}`}
                primaryText={translate(`resources.${resource.name}.name`)}
                leftIcon={<resource.icon/>}
                onClick={onMenuClick}
                sidebarIsOpen={open}
            />
        )}
        <MenuItemLink
            to="/configuration"
            primaryText={translate('pos.configuration')}
            leftIcon={<SettingsIcon/>}
            onClick={onMenuClick}
            sidebarIsOpen={open}
        />
        {isXSmall && logout}
    </>;
}
