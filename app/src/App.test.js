import React from 'react'
import {waitFor, render} from '@testing-library/react'
import {MemoryRouter} from 'react-router-dom'

import App from './App'
import resources from './commons/resources/fake'
import {TOKEN} from './commons'

const tokenMock = jest.fn()
const auth = userId => tokenMock.mockReturnValue(userId && resources.users.find(({id}) => id === userId).token)
Object.defineProperty(global, 'localStorage', {value: {getItem: key => key === TOKEN && tokenMock(), setItem: () => {}}})

const renderWithHistory = (route = '/') => render(
    <MemoryRouter initialEntries={[route]}>
        <App/>
    </MemoryRouter>
)

describe('App', () => {

    it('should render home page', async () => {
        const {getByText} = renderWithHistory()
        let container = await waitFor(() => getByText('Sample page 1'))
        expect(container).toBeDefined()
        container = await waitFor(() => getByText('Home page'))
        expect(container).toBeDefined()
        expect(document.title).toEqual('Home page')
    })

    it('should render login page', async () => {
        const {getByText} = renderWithHistory('/login')
        const container = await waitFor(() => getByText('Sign in'))
        expect(container).toBeDefined()
    })

    it('should render none page', async () => {
        const {getByText} = renderWithHistory('/cms/pages/no-exist')
        let container = await waitFor(() => getByText('Sample page 1'))
        expect(container).toBeDefined()
        container = await waitFor(() => getByText('Page not found'))
        expect(container).toBeDefined()
        expect(document.title).toEqual('Not found')
    })

    it('should render sample page', async () => {
        const {getByText} = renderWithHistory('/cms/pages/sample1')
        let container = await waitFor(() => getByText('Sample page 2'))
        expect(container).toBeDefined()
        container = await waitFor(() => getByText((c, {tagName}) => tagName === 'H1' && c === 'Sample page 1'))
        expect(container).toBeDefined()
        expect(document.title).toEqual('Sample page 1')
    })

    it('should render sample page with fragment', async () => {
        const {getByText} = renderWithHistory('/cms/pages/sample2')
        let container = await waitFor(() => getByText('Sample page 1'))
        expect(container).toBeDefined()
        container = await waitFor(() => getByText((c, {tagName}) => tagName === 'H1' && c === 'Sample page 2'))
        expect(container).toBeDefined()
        container = await waitFor(() => getByText('Fragment 1'))
        expect(container).toBeDefined()
        expect(document.title).toEqual('Sample page 2')
    })

    it('should render sample page with two fragments', async () => {
        const {getByText} = renderWithHistory('/cms/pages/sample3')
        let container = await waitFor(() => getByText('Sample page 1'))
        expect(container).toBeDefined()
        container = await waitFor(() => getByText((c, {tagName}) => tagName === 'H1' && c === 'Sample page 3'))
        expect(container).toBeDefined()
        container = await waitFor(() => getByText('Fragment 1'))
        expect(container).toBeDefined()
        container = await waitFor(() => getByText('Fragment 2'))
        expect(container).toBeDefined()
        expect(document.title).toEqual('Sample page 3')
    })

    it('should render sample page with auth content for editor', async () => {
        auth('editor')
        const {getByText} = renderWithHistory('/cms/pages/sample4')
        let container = await waitFor(() => getByText('Sample page 1'))
        expect(container).toBeDefined()
        container = await waitFor(() => getByText('Content for editor'))
        expect(container).toBeDefined()
        expect(document.title).toEqual('Sample page 4')
    })

    it('should render sample page with auth content for all except editor', async () => {
        auth(null)
        const {getByText} = renderWithHistory('/cms/pages/sample4')
        let container = await waitFor(() => getByText('Sample page 1'))
        expect(container).toBeDefined()
        container = await waitFor(() => getByText('Content for all except editor'))
        expect(container).toBeDefined()
        expect(document.title).toEqual('Sample page 4')
    })
})
