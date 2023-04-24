import { queryByAttribute } from '@testing-library/react'

const getById = queryByAttribute.bind(null, 'id');

test('Example test', () => {
  // const dom = render(<App />)
  expect(true).toBeDefined()
})
