import App from './App'
import { render, queryByAttribute } from '@testing-library/react'


const getById = queryByAttribute.bind(null, 'id');

test('Example test', async () => {
  const dom = render(<App />)
  expect(getById(dom.container, 'root')).toBeDefined()
})
