import React from 'react'
import {render, screen} from '@testing-library/react'
import {MemoryRouter} from 'react-router-dom'

import App from './App'
import getProvider from './provider/fake'
import config from './config';

const {authProvider} = getProvider()

const renderWithHistory = (route = '/') => render(
    <MemoryRouter initialEntries={[route]}>
        <App {...{config}}/>
    </MemoryRouter>
)

describe('App', () => {

    it('should render home page', async () => {
        renderWithHistory()
        expect(await screen.findByText('Home page')).toBeDefined()
        expect(document.title).toEqual('Home page')
    })

    it('should render login page', async () => {
        renderWithHistory('/login')
        expect(await screen.findByText('Sign in')).toBeDefined()
    })

    it('should render none page', async () => {
        renderWithHistory('/no-exist')
        expect(await screen.findByText('Page not found')).toBeDefined()
        expect(document.title).toEqual('Not found')
    })

    it('should render sample page', async () => {
        renderWithHistory('/sample1')
        expect(await screen.findByText('Sample page 1')).toBeDefined()
        expect(document.title).toEqual('Sample page 1')
    })

    it('should render sample page with fragment', async () => {
        renderWithHistory('/sample2')
        expect(await screen.findByText('Sample page 2')).toBeDefined()
        expect(await screen.findByText('Fragment 1')).toBeDefined()
        expect(document.title).toEqual('Sample page 2')
    })

    it('should render sample page with two fragments', async () => {
        renderWithHistory('/sample3')
        expect(await screen.findByText('Sample page 3')).toBeDefined()
        expect(await screen.findByText('Fragment 1')).toBeDefined()
        expect(await screen.findByText('Fragment 2')).toBeDefined()
        expect(document.title).toEqual('Sample page 3')
    })

    it('should render sample page with auth content for editor', async () => {
        authProvider.login({username: 'editor'})
        renderWithHistory('/sample4')
        expect(await screen.findByText('Sample page 4')).toBeDefined()
        expect(await screen.findByText('Content for editor')).toBeDefined()
        expect(document.title).toEqual('Sample page 4')
    })

    it('should render sample page with auth content for all except editor', async () => {
        authProvider.logout()
        renderWithHistory('/sample4')
        expect(await screen.findByText('Sample page 4')).toBeDefined()
        expect(await screen.findByText('Content for all except editor')).toBeDefined()
        expect(document.title).toEqual('Sample page 4')
    })

    it('should render sample page with properties', async () => {
        renderWithHistory('/sample5')
        expect(await screen.findByText('Sample page 5')).toBeDefined()
        expect(await screen.findByText('Properties')).toBeDefined()
        expect(document.title).toEqual('Sample page 5')
    })
})
