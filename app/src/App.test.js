import React from 'react'
import {waitFor} from '@testing-library/react'

import renderWithHistory from './commons/renderWithHistory'
import App from './App'

describe('App', () => {

    it('should render home page', async () => {
        const {getByText} = renderWithHistory(<App/>)
        let container = await waitFor(() => getByText('menu title'))
        expect(container).toBeDefined()
        container = await waitFor(() => getByText('home content'))
        expect(container).toBeDefined()
        expect(document.title).toEqual('home title')
    })

    it('should render login page', async () => {
        const {getByText} = renderWithHistory(<App/>, {route: '/login'})
        const container = await waitFor(() => getByText('Sign in'))
        expect(container).toBeDefined()
    })

    it('should render none page', async () => {
        const {getByText} = renderWithHistory(<App/>, {route: '/page/no-exist'})
        let container = await waitFor(() => getByText('menu title'))
        expect(container).toBeDefined()
        container = await waitFor(() => getByText('none content'))
        expect(container).toBeDefined()
        expect(document.title).toEqual('none title')
    })

    it('should render sample page', async () => {
        const {getByText} = renderWithHistory(<App/>, {route: '/page/sample1'})
        let container = await waitFor(() => getByText('menu title'))
        expect(container).toBeDefined()
        container = await waitFor(() => getByText('sample1 content'))
        expect(container).toBeDefined()
        expect(document.title).toEqual('sample1 title')
    })

    it('should render sample page with fragment', async () => {
        const {getByText} = renderWithHistory(<App/>, {route: '/page/sample2'})
        let container = await waitFor(() => getByText('menu title'))
        expect(container).toBeDefined()
        container = await waitFor(() => getByText('sample2 content'))
        expect(container).toBeDefined()
        container = await waitFor(() => getByText('fragment1 content'))
        expect(container).toBeDefined()
        expect(document.title).toEqual('sample2 title')
    })

    it('should render sample page with two fragments', async () => {
        const {getByText} = renderWithHistory(<App/>, {route: '/page/sample3'})
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

    it('should render sample page with auth content', async () => {
        const {getByText} = renderWithHistory(<App/>, {route: '/page/sample4'})
        let container = await waitFor(() => getByText('menu title'))
        expect(container).toBeDefined()
        container = await waitFor(() => getByText('sample4 content for editor'))
        expect(container).toBeDefined()
        expect(document.title).toEqual('sample4 title')
    })
})
