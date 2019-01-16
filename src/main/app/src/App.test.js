import React from 'react';
import {shallow} from 'enzyme';

import App from './App';

describe('app', () => {

    it('should render empty div', () => {
        expect(shallow(<App/>).html()).toEqual('<div></div>');
    });
});
