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

    it('should render content and set title', async () => {
        const {getByTestId} = render(<App/>);
        const container = await waitForElement(() => getByTestId('content'));
        expect(container.innerHTML).toBe('test content');
        expect(document.title).toBe('test title');
    });
});
