import React, {useState, useEffect} from 'react';
import IconButton from '@mui/material/IconButton';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SettingsIcon from '@mui/icons-material/Settings';
import EditIcon from '@mui/icons-material/Edit';
import { usePermissions, useRefresh } from 'react-admin';
import { Link, useParams } from 'react-router-dom';

import { useContextProvider } from '..';

export default () => {

    const refresh = useRefresh();
    const {permissions} = usePermissions();
    const [loading, setLoading] = useState(true);
    const {id} = useParams();
    const {resources: {users: {tags: {PAGES_EDITOR, MANAGER}}}} = useContextProvider();

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
            to={`/admin/pages/${id || ''}`}
        >
            <EditIcon/>
        </IconButton>;
    }

    if (permissions.includes(MANAGER)) {
        return <IconButton
            color="inherit"
            component={Link}
            to="/admin/users"
        >
            <SettingsIcon/>
        </IconButton>;
    }

    return <IconButton
        color="inherit"
        component={Link}
        to="/admin"
    >
        <SettingsIcon/>
    </IconButton>;
};