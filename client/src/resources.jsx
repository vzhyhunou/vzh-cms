import React from 'react';
import { Resource } from 'react-admin';

import { pages, users } from '.';

export default {
    pages: <Resource name="pages" {...pages}/>,
    users: <Resource name="users" {...users}/>
};