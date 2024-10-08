import React from 'react';
import { CustomRoutes, Resource, Layout } from 'react-admin';
import { Route, Navigate } from 'react-router-dom';

import Admin from './admin/App';
import Context from './context/App';

export default ({config, resources, children, ...rest}) =>
    <Context {...config}>
        <Admin {...rest} basename="/admin">
            {permissions => {

                const access = permissions ? Object.entries(resources)
                    .filter(([k]) => permissions.includes(k))
                    .flatMap(([k, v]) => Object.entries(v).map(([k, v]) => [k, <Resource key={k} name={k} {...v} />])) : [];

                return <>
                    <CustomRoutes noLayout>
                        <Route path="admin">
                            {permissions ?
                                <>
                                    <Route path="" element={<Layout/>}/>
                                    {access.map(([k, v]) => <Route key={k} path={`${k}/*`} element={<Layout>{v}</Layout>}/>)}
                                </>
                                :
                                <Route path="*?" element={<Navigate to="/login"/>}/>
                            }
                        </Route>
                        {children}
                    </CustomRoutes>
                    {access.map(([k, v]) => v)}
                </>;
            }}
        </Admin>
    </Context>
;