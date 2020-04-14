import React from 'react';

const rrd = require('react-router-dom');

rrd.BrowserRouter = jest.fn().mockImplementation(({children}) =>
    <rrd.MemoryRouter>{children}</rrd.MemoryRouter>
);

module.exports = rrd;
