import { render } from '@testing-library/react';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { reducers } from '../../store/index';
import AuthForm from './AuthForm';
// import { userSlice } from '../../store/slices/User';

// const userStub = {
//   id: 1,
//   first_name: '1',
//   second_name: '2',
//   display_name: '3',
//   login: '4',
//   email: '5',
//   phone: '6',
//   avatar: '7',
// };

describe('components/AuthForm', () => {
  const mockStore = configureStore({ reducer: reducers });
  it('should render', () => {
    const view = render(
      <Provider store={mockStore}>
        <BrowserRouter>
          <AuthForm />
        </BrowserRouter>
      </Provider>
    );
    expect(view.getByTestId('auth-form')).toBeInTheDocument();
  });

  it('after auth user shoud be in the store', () => {
  //   const fetchMock = jest
  //     .spyOn(global, 'fetch')
  //     .mockImplementation(() =>
  //       Promise.resolve({ json: () => Promise.resolve([]) })
  //     );
  });
});
