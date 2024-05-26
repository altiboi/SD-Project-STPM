import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import CreateFine from './CreateFine';

describe('CreateFine Component', () => {
  const mockClose = jest.fn();
  const resident = 'Test Resident';

  beforeEach(() => {
    fetch.resetMocks(); // Reset fetch mock before each test
  });

  test('renders the CreateFine component', () => {
    render(<CreateFine resident={resident} isOpen={true} Close={mockClose} />);
    expect(screen.getByText('Create fine')).toBeInTheDocument();
  });

  test('handles input changes', () => {
    render(<CreateFine resident={resident} isOpen={true} Close={mockClose} />);
    const fineReasonInput = screen.getByPlaceholderText('Fine Reason....');
    const fineAmountInput = screen.getByPlaceholderText('Fine Amount....');

    fireEvent.change(fineReasonInput, { target: { value: 'Noise complaint' } });
    fireEvent.change(fineAmountInput, { target: { value: '50' } });

    expect(fineReasonInput.value).toBe('Noise complaint');
    expect(fineAmountInput.value).toBe('50');
  });

  test('handles form submission', async () => {
    render(<CreateFine resident={resident} isOpen={true} Close={mockClose} />);
    const fineReasonInput = screen.getByPlaceholderText('Fine Reason....');
    const fineAmountInput = screen.getByPlaceholderText('Fine Amount....');
    const createButton = screen.getByText('Create');

    fireEvent.change(fineReasonInput, { target: { value: 'Noise complaint' } });
    fireEvent.change(fineAmountInput, { target: { value: '50' } });

    fireEvent.click(createButton);

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith(
        'https://blocbuddyapi.azurewebsites.net/api/CreateFine?',
        expect.objectContaining({
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            Resident: resident,
            fine_amount: 50,
            fine_reason: 'Noise complaint',
            date_issued: expect.any(String),
          }),
        })
      );
    });
  });

  test('handles closing the component', () => {
    render(<CreateFine resident={resident} isOpen={true} Close={mockClose} />);
    const closeButton = screen.getByText('x');

    fireEvent.click(closeButton);

    expect(mockClose).toHaveBeenCalledWith('CreateFine');
  });
});
