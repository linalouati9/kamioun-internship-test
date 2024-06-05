import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Create from './create-account';
import { act } from 'react';

// Just a few test cases :) but of course we have to test more test cases: 
// required inputs, email format..
test('renders Create component', () => {
  act(() => {
    render(<Create />);
  });
  const headingElement = screen.getByText(/Create Account/i, { selector: 'strong' });
  expect(headingElement).toBeInTheDocument();
});

// Test case for displaying error when password is less than 6 characters
test('displays error when password is less than 6 characters', () => {
  render(<Create />);
  fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: '123' } });
  expect(screen.getByText(/Password must be at least 6 characters long/i)).toBeInTheDocument();
}); 

// Test case for form submission with valid data
test('form submission with valid data', () => {
  render(<Create />);
  fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'linalouati99@gmail.com' } });
  fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: 'linalo' } });
  fireEvent.change(screen.getByLabelText(/Year of experience/i), { target: { value: '1' } });
  //fireEvent.change(screen.getByLabelText(/Remember Me/i), { target: { value: true } });
  fireEvent.change(screen.getByLabelText(/Remember Me/i), { target: { value: false } });

  fireEvent.click(screen.getByText(/Create Account/i, { selector: 'button' }));

  // Ensure the error message is not displayed when the form is submitted with valid data
  expect(screen.queryByText(/Password must be at least 6 characters long/i)).not.toBeInTheDocument();
});
