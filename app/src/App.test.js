import React from 'react';
import {BrowserRouter, MemoryRouter} from 'react-router-dom';
import {render, waitForElement} from 'react-testing-library';

import App from './App';

describe('App', () => {

    it('should render empty div', () => {
        const {container} = render(<App/>);
        expect(container.innerHTML).toBe('<div></div>');
    });

    it('should render content and set title', async () => {
        const {getByText} = render(<App/>);
        const container = await waitForElement(() => getByText('test content'));
        expect(container).toBeDefined();
        expect(document.title).toBe('test title');
    });

    it('should render login page', async () => {
        BrowserRouter.mockImplementationOnce(({children}) =>
            <MemoryRouter initialEntries={['/admin']}>{children}</MemoryRouter>
        );
        const {getByText} = render(<App/>);
        const container = await waitForElement(() => getByText('Sign in'));
        expect(container).toBeDefined();
        expect(document.title).toBe('Control Panel');
    });
});
