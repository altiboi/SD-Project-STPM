import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import SignUpForm from './SignUpForm';

describe('SignUpForm component', () => {
  it('renders correctly', () => {
    const { getByText, getByLabelText } = render(<SignUpForm isOpen={true} closeSignUp={() => {}} />);
    
    expect(getByText('Sign Up')).toBeInTheDocument();
    expect(getByLabelText('Role:')).toBeInTheDocument();
    // Add assertions for other form elements
  });

  it('handles form data correctly', () => {
    const { getByLabelText } = render(<SignUpForm isOpen={true} closeSignUp={() => {}} />);
    const nameInput = getByLabelText('Name:');
    fireEvent.change(nameInput, { target: { value: 'John' } });
    expect(nameInput.value).toBe('John');
    // Add assertions for other form inputs
  });

  it('submits form data correctly', async () => {
    const closeSignUpMock = jest.fn();
    const { getByText, getByLabelText } = render(<SignUpForm isOpen={true} closeSignUp={closeSignUpMock} />);
    const nameInput = getByLabelText('Name:');
    fireEvent.change(nameInput, { target: { value: 'John' } });
    // Add similar fireEvent calls for other form inputs

    fireEvent.click(getByText('Complete Sign Up'));

    await waitFor(() => {
      expect(closeSignUpMock).toHaveBeenCalledTimes(1);
      // Add assertions to check if handleSubmit function is called with correct data
    });
  });

  it('calls closeSignUp function when Cancel button is clicked', () => {
    const closeSignUpMock = jest.fn();
    const { getByText } = render(<SignUpForm isOpen={true} closeSignUp={closeSignUpMock} />);
    fireEvent.click(getByText('Cancel'));
    expect(closeSignUpMock).toHaveBeenCalledTimes(1);
  });
});
