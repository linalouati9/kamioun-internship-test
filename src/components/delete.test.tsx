import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Delete from './delete-account';
import { act } from 'react';
import Swal from 'sweetalert2';

test('renders Delete component', () => {
    act(() => {
        render(<Delete />);
      });
    const headingElement = screen.getByText(/Delete Your Account/i, { selector: 'strong' });
    expect(headingElement).toBeInTheDocument();
});

test('displays error when comment exceeds 2000 characters', () => {
  render(<Delete />);
  const longComment = 'a'.repeat(2001);
  fireEvent.change(screen.getByLabelText(/Let us know if you have any other comments/i), { target: { value: longComment } });
  expect(screen.getByText(/Comment should not exceed 2000 characters/i)).toBeInTheDocument();
});

// Mock of Swal
jest.mock('sweetalert2', () => ({
    fire: jest.fn(),
}));
  
test('form submission with no reason selected', async () => {
    render(<Delete />);
    fireEvent.change(screen.getByLabelText(/Let us know if you have any other comments/i), { target: { value: 'Test comment' } });
    fireEvent.click(screen.getByText(/Submit/i, { selector: 'button' }));

    await new Promise(resolve => setTimeout(resolve, 1000));

    expect(Swal.fire).toHaveBeenCalledWith({
      icon: 'error',
      text: 'Array must contain at least 1 element(s)',
      showConfirmButton: false,
      timer: 5000,
    });
  });