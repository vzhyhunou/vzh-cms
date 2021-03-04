import React, {useEffect, forwardRef} from 'react';
import {
    Layout,
    AppBar,
    UserMenu,
    MenuItemLink,
    useTranslate
} from 'react-admin';
import SettingsIcon from '@material-ui/icons/Settings';

const ConfigurationMenu = forwardRef(({onClick}, ref) => {

    const translate = useTranslate();

    return <MenuItemLink
        ref={ref}
        to="/configuration"
        primaryText={translate('pos.configuration')}
        leftIcon={<SettingsIcon />}
        onClick={onClick}
    />;
});

const Menu = props =>
    <UserMenu {...props}>
        <ConfigurationMenu />
    </UserMenu>
;

const Bar = props => <AppBar {...props} userMenu={<Menu />} />;

export default props => {

    const translate = useTranslate();

    useEffect(() => {
        document.title = translate('pos.title');
    }, [translate]);

    return <Layout {...props} appBar={Bar} />;
};
