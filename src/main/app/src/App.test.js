import React from 'react';
import {expect} from 'chai';
import {shallow} from 'enzyme';
import App from './App';

describe('app', function () {

    it('should render empty div', function () {
        expect(shallow(<App/>).html()).to.equal('<div></div>');
    });
});
