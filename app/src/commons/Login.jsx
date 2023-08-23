import React, {useState, useEffect} from 'react';
import {IconButton} from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SettingsIcon from '@mui/icons-material/Settings';
import EditIcon from '@mui/icons-material/Edit';
import {usePermissions, useRefresh} from 'react-admin';
import {Link, useParams} from 'react-router-dom';

import {useRoles} from '.';

export default () => {

    const refresh = useRefresh();
    const {permissions} = usePermissions();
    const [loading, setLoading] = useState(true);
    const {id} = useParams();
    const {PAGES_EDITOR, MANAGER} = useRoles();

    useEffect(() => {
        refresh();
        setLoading(false);
    }, [refresh]);

    if (loading) {
        return null;
    }

    if (!permissions) {
        return <IconButton
            color="inherit"
            component={Link}
            to="/login"
        >
            <AccountCircleIcon/>
        </IconButton>;
    }

    if (permissions.includes(PAGES_EDITOR)) {
        return <IconButton
            color="inherit"
            component={Link}
            to={`/pages/${id}`}
        >
            <EditIcon/>
        </IconButton>;
    }

    if (permissions.includes(MANAGER)) {
        return <IconButton
            color="inherit"
            component={Link}
            to="/users"
        >
            <SettingsIcon/>
        </IconButton>;
    }

    return null;
};
