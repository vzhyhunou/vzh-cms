import React from 'react'
import {waitFor, render} from '@testing-library/react'
import {MemoryRouter} from 'react-router-dom'

import App, {roles} from './App'
import {ROLES} from './admin/auth'

const permissionsMock = jest.fn()
Object.defineProperty(global, 'localStorage', {value: {getItem: key => key === ROLES && permissionsMock(), setItem: () => {}}})

const renderWithHistory = (route = '/') => render(
    <MemoryRouter initialEntries={[route]}>
        <App/>
    </MemoryRouter>
)

describe('App', () => {

    it('should render home page', async () => {
        const {getByText} = renderWithHistory()
        let container = await waitFor(() => getByText('menu title'))
        expect(container).toBeDefined()
        container = await waitFor(() => getByText('home content'))
        expect(container).toBeDefined()
        expect(document.title).toEqual('home title')
    })

    it('should render login page', async () => {
        const {getByText} = renderWithHistory('/login')
        const container = await waitFor(() => getByText('Sign in'))
        expect(container).toBeDefined()
    })

    it('should render none page', async () => {
        const {getByText} = renderWithHistory('/cms/pages/no-exist')
        let container = await waitFor(() => getByText('menu title'))
        expect(container).toBeDefined()
        container = await waitFor(() => getByText('none content'))
        expect(container).toBeDefined()
        expect(document.title).toEqual('none title')
    })

    it('should render sample page', async () => {
        const {getByText} = renderWithHistory('/cms/pages/sample1')
        let container = await waitFor(() => getByText('menu title'))
        expect(container).toBeDefined()
        container = await waitFor(() => getByText('sample1 content'))
        expect(container).toBeDefined()
        expect(document.title).toEqual('sample1 title')
    })

    it('should render sample page with fragment', async () => {
        const {getByText} = renderWithHistory('/cms/pages/sample2')
        let container = await waitFor(() => getByText('menu title'))
        expect(container).toBeDefined()
        container = await waitFor(() => getByText('sample2 content'))
        expect(container).toBeDefined()
        container = await waitFor(() => getByText('fragment1 content'))
        expect(container).toBeDefined()
        expect(document.title).toEqual('sample2 title')
    })

    it('should render sample page with two fragments', async () => {
        const {getByText} = renderWithHistory('/cms/pages/sample3')
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

    it('should render sample page with auth content for editor', async () => {
        permissionsMock.mockReturnValue(roles.EDITOR)
        const {getByText} = renderWithHistory('/cms/pages/sample4')
        let container = await waitFor(() => getByText('menu title'))
        expect(container).toBeDefined()
        container = await waitFor(() => getByText('sample4 content for editor'))
        expect(container).toBeDefined()
        expect(document.title).toEqual('sample4 title')
    })

    it('should render sample page with auth content for all except editor', async () => {
        permissionsMock.mockReturnValue(null)
        const {getByText} = renderWithHistory('/cms/pages/sample4')
        let container = await waitFor(() => getByText('menu title'))
        expect(container).toBeDefined()
        container = await waitFor(() => getByText('sample4 content for all except editor'))
        expect(container).toBeDefined()
        expect(document.title).toEqual('sample4 title')
    })
})
