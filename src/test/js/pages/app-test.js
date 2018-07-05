'use strict';

import React from 'react';
import {expect} from 'chai';
import {shallow} from 'enzyme';
import App from '../../../main/js/pages/app';

describe('app', function () {

    it('should render empty div', function () {
        expect(shallow(<App/>).html()).to.equal('<div></div>');
    });
});
