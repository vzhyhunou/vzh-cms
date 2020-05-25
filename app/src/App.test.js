import React from 'react'
import {waitFor} from '@testing-library/react'

import renderWithRouter from './commons/renderWithRouter'
import App from './App'

describe('App', () => {

    it('should render home page', async () => {
        const {getByText} = renderWithRouter(<App/>)
        let container = await waitFor(() => getByText('menu title'))
        expect(container).toBeDefined()
        container = await waitFor(() => getByText('home content'))
        expect(container).toBeDefined()
        expect(document.title).toEqual('home title')
    })

    it('should render login page', async () => {
        const {getByText} = renderWithRouter(<App/>, {route: '/admin'})
        const container = await waitFor(() => getByText('Sign in'))
        expect(container).toBeDefined()
        expect(document.title).toEqual('Control Panel')
    })

    it('should render none page', async () => {
        const {getByText} = renderWithRouter(<App/>, {route: '/pages/no-exist'})
        let container = await waitFor(() => getByText('menu title'))
        expect(container).toBeDefined()
        container = await waitFor(() => getByText('none content'))
        expect(container).toBeDefined()
        expect(document.title).toEqual('none title')
    })

    it('should render sample page', async () => {
        const {getByText} = renderWithRouter(<App/>, {route: '/pages/sample1'})
        let container = await waitFor(() => getByText('menu title'))
        expect(container).toBeDefined()
        container = await waitFor(() => getByText('sample1 content'))
        expect(container).toBeDefined()
        expect(document.title).toEqual('sample1 title')
    })

    it('should render sample page with fragment', async () => {
        const {getByText} = renderWithRouter(<App/>, {route: '/pages/sample2'})
        let container = await waitFor(() => getByText('menu title'))
        expect(container).toBeDefined()
        container = await waitFor(() => getByText('sample2 content'))
        expect(container).toBeDefined()
        container = await waitFor(() => getByText('fragment1 content'))
        expect(container).toBeDefined()
        expect(document.title).toEqual('sample2 title')
    })

    it('should render sample page with two fragments', async () => {
        const {getByText} = renderWithRouter(<App/>, {route: '/pages/sample3'})
        let container = await waitFor(() => getByText('menu title'))
        expect(container).toBeDefined()
        container = await waitFor(() => getByText('sample3 content'))
        expect(container).toBeDefined()
        container = await waitFor(() => getByText('fragment1 content'))
        expect(container).toBeDefined()
        container = await waitFor(() => getByText('fragment2 content'))
        expect(container).toBeDefined()
        expect(document.title).toEqual('sample3 title')
    })
})
