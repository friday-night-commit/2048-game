import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { reducers } from '../../store/index';
import AuthForm from './AuthForm';

const userStub = {
  id: 1,
  first_name: '1',
  second_name: '2',
  display_name: '3',
  login: '4',
  email: '5',
  phone: '6',
  avatar: '7',
};

function setupFetchStub(data: any) {
  return function fetchStub(_url: URL) {
    return new Promise(resolve => {
      resolve({
        json: () =>
          Promise.resolve({
            data,
          }),
      });
    });
  };
}

describe('components/AuthForm', () => {
  const mockStore = configureStore({ reducer: reducers });
  const view = render(
    <Provider store={mockStore}>
      <BrowserRouter>
        <AuthForm />
      </BrowserRouter>
    </Provider>
  );

  it('should render', () => {
    expect(view.getByTestId('auth-form')).toBeInTheDocument();
  });

  it('after auth user shoud be in the store', async () => {
    const user = userEvent.setup();
    const fetchMock = jest
		.spyOn(window, 'fetch')
		// @ts-ignore
		.mockImplementation(setupFetchStub(userStub));
    await user.click(view.getByTestId('login-input'));
		await user.paste('admin');
    await user.click(view.getByTestId('password-input'));
		await user.paste('admin');
		await user.click(view.getByText('Войти'));

		expect(fetchMock).toHaveBeenCalledTimes(1);
  });
});
