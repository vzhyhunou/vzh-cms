import React from 'react'
import {waitFor} from '@testing-library/react'

import renderWithRouter from './commons/renderWithRouter'
import App from './App'

describe('App', () => {

    it('should render content and set title', async () => {
        const {getByText} = renderWithRouter(<App/>)
        const container = await waitFor(() => getByText('test content'))
        expect(container).toBeDefined()
        expect(document.title).toEqual('test title')
    })

    it('should render login page', async () => {
        const {getByText} = renderWithRouter(<App/>, {route: '/admin'})
        const container = await waitFor(() => getByText('Sign in'))
        expect(container).toBeDefined()
        expect(document.title).toEqual('Control Panel')
    })
})
