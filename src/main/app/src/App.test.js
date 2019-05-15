import React from 'react';
import {cleanup, render, waitForElement} from 'react-testing-library';

import App from './App';

jest.mock('./commons/fetch');
afterEach(cleanup);

describe('App', () => {

    it('should render empty div', () => {
        const {container} = render(<App/>);
        expect(container.innerHTML).toBe('<div></div>');
    });

    it('should render content', async () => {
        const {getByTestId} = render(<App/>);
        const elem = await waitForElement(() => getByTestId('content'));
        expect(elem.textContent).toBe('test content');
    });
});
