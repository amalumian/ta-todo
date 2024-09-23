import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'

import App from './App'
import store from './store'

describe('App', () => {
  it('renders App component', () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>,
    )

    screen.debug()

    expect(screen.getByText('TODO')).toBeInTheDocument()
  })
})

