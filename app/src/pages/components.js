import {lazy} from 'react';

export default {
    page: lazy(() => import('./App'))
};
