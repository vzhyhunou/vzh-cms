import {cloneElement} from 'react'
import {render} from '@testing-library/react'
import {createMemoryHistory} from 'history'

export default (
    ui,
    {
        route = '/',
        history = createMemoryHistory({initialEntries: [route]})
    } = {}
) => ({
    ...render(cloneElement(ui, {history})),
    history
})
