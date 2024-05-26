import React from 'react';
import { render, waitFor, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; 
import Unsolved from './Unsolved'; 

// Mock the fetch function
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve([{ _id: 1, title: 'Title 1', ticket_subject: 'Subject 1', dateOpened: '2022-05-01' }]),
    ok: true,
  })
);

describe('Unsolved Component', () => {
  it('renders without crashing', async () => {
    render(<Unsolved />);
    await waitFor(() => expect(fetch).toHaveBeenCalled()); // Wait for fetch to be called
  });

  it('displays tickets data', async () => {
    const { getByText } = render(<Unsolved />);
    await waitFor(() => expect(fetch).toHaveBeenCalled());

    expect(getByText('Title 1')).toBeInTheDocument();
    expect(getByText('Subject 1')).toBeInTheDocument();
    expect(getByText('2022-05-01')).toBeInTheDocument();
  });

  
});
