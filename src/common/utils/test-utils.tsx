import { render } from '@testing-library/react'
import { Provider } from 'react-redux'

import store from '../../app/store'

export function renderWithProvider(ui: React.ReactElement) {
  const Wrapper = ({ children }: { children: React.ReactNode }) => (
    <Provider store={store}>{children}</Provider>
  )

  return {
    store,
    ...render(ui, { wrapper: Wrapper }),
  }
}
