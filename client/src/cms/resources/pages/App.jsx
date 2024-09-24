import React from 'react';
import { useParams } from 'react-router-dom';

import Component from './Component';

export default () => {

    const {id} = useParams();

    return <Component {...{id}} external/>;
};