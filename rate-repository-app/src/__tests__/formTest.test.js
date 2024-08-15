import { render, screen, fireEvent, waitFor } from '@testing-library/react-native';
import { SignInContainer } from '../components/SignInContainer';
// ...

describe('SignIn', () => {
  describe('SignInContainer', () => {
    it('calls onSubmit function with correct arguments when a valid form is submitted', async () => {
      const onSubmit = jest.fn();
      const { getByPlaceholderText, getByText } = render( <SignInContainer onSubmit={onSubmit} />)

      fireEvent.changeText(screen.getByPlaceholderText('Enter your username'), 'kalle');
      fireEvent.changeText(screen.getByPlaceholderText('Enter your password'), 'password')
      fireEvent.press(screen.getByText('Log In'))

      await waitFor(() => {
        // expect the onSubmit function to have been called once and with a correct first argument
        expect(onSubmit).toHaveBeenCalledTimes(1);
        expect(onSubmit.mock.calls[0][0]).toEqual({
            username: 'kalle',
            password: 'password',
          });
      });
    });
  });
});