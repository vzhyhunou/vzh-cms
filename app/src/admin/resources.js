import React from 'react';
import {Resource} from 'react-admin';
import PageIcon from '@material-ui/icons/LibraryBooks';
import UserIcon from '@material-ui/icons/People';

import PageCreate from './pages/Create';
import PageEdit from './pages/Edit';
import PageList from './pages/List';
import UserCreate from './users/Create';
import UserEdit from './users/Edit';
import UserList from './users/List';
import {EDITOR, MANAGER} from '../commons/roles';

export default permissions => [
    ...(permissions && permissions.includes(EDITOR) ? [
        <Resource
            name="pages"
            list={PageList}
            edit={PageEdit}
            create={PageCreate}
            icon={PageIcon}
        />
    ] : []),
    ...(permissions && permissions.includes(MANAGER) ? [
        <Resource
            name="users"
            list={UserList}
            edit={UserEdit}
            create={UserCreate}
            icon={UserIcon}
        />
    ] : []),
    <></>
];
