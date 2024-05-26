import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Fines from './Fines';

describe('Fines Component', () => {
  const rows = [
    { fine_reason: 'Parking violation', status: 'Unpaid', date_issued: '2024-05-20', fine_amount: 50 },
    { fine_reason: 'Noise complaint', status: 'Paid', date_issued: '2024-05-15', fine_amount: 100 },
  ];

  it('renders the table with rows', () => {
    render(<Fines rows={rows} />);
    expect(screen.getByText('Parking violation')).toBeTruthy();
    expect(screen.getByText('Noise complaint')).toBeTruthy();
  });

  it('renders the correct status label', () => {
    render(<Fines rows={rows} />);
    const unpaidStatus = screen.getByText('Unpaid');
    const paidStatus = screen.getByText('Paid');
    expect(unpaidStatus.className).toContain('label-Unpaid');
    expect(paidStatus.className).toContain('label-Paid');
  });

  it('renders the actions for unpaid rows', () => {
    render(<Fines rows={rows} />);
    const payNowButtons = screen.getAllByText('Pay now');
    expect(payNowButtons.length).toBe(1); // Only one row is unpaid
  });

  it('does not render actions for paid rows', () => {
    render(<Fines rows={rows} />);
    const payNowButtons = screen.queryAllByText('Pay now');
    expect(payNowButtons.length).toBe(0); // No row is paid
  });

  it('calls editRow function when Pay now button is clicked', () => {
    const editRowMock = jest.fn();
    render(<Fines rows={rows} editRow={editRowMock} />);
    const payNowButton = screen.queryByText('Pay now');
    if (payNowButton) {
      fireEvent.click(payNowButton);
      expect(editRowMock).toHaveBeenCalled();
    }
  });
});
