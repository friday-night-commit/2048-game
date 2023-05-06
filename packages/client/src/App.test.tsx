import { queryByAttribute } from '@testing-library/react';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getById = queryByAttribute.bind(null, 'id');

test('Example test', () => {
  // const dom = render(<App />)
  expect(true).toBeDefined();
});
