import { render, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Input from './index';

describe('components/Input', () => {
  const inputPlaceholder = 'inputPlaceholder';

  it('should render', () => {
    const view = render(
      <Input
        required={false}
        placeholder={inputPlaceholder}
        name='test'
        type='text'
        label='Test'
        validationType='default'
        onChange={jest.fn}
      />
    );
    expect(view.getByPlaceholderText(inputPlaceholder)).toBeInTheDocument();
  });

  it('after change should display new value', async () => {
    const user = userEvent.setup();
    const newValue = 'newValue';

    const view = render(
      <Input
        required={false}
        placeholder={inputPlaceholder}
        name='test'
        type='text'
        label='Test'
        validationType='default'
        onChange={jest.fn}
      />
    );
    await user.click(view.getByPlaceholderText(inputPlaceholder));
    await user.paste(newValue);
    expect(view.getByPlaceholderText(inputPlaceholder)).toHaveValue(newValue);
  });

  it('if value is wrong should render the error', async () => {
    const view = render(
      <Input
        required={true}
        placeholder={inputPlaceholder}
        name='test'
        type='text'
        label='Test'
        validationType='login'
        onChange={jest.fn}
      />
    );
    expect(view.getByTestId('error-element')).toBeEmptyDOMElement();

    fireEvent.change(view.getByPlaceholderText(inputPlaceholder), {
      target: { value: '123' },
    });
    fireEvent.blur(view.getByPlaceholderText(inputPlaceholder));

    expect(view.getByTestId('error-element')).not.toBeEmptyDOMElement();
  });

  it('function onChange was called after change', async () => {
    const onChange = jest.fn();
    const view = render(
      <Input
        required={true}
        placeholder={inputPlaceholder}
        name='test'
        type='text'
        label='Test'
        validationType='login'
        onChange={onChange}
      />
    );

    fireEvent.change(view.getByPlaceholderText(inputPlaceholder), {
      target: { value: '123' },
    });
    fireEvent.blur(view.getByPlaceholderText(inputPlaceholder));

    expect(onChange).toHaveBeenCalledTimes(1);
  });
});
