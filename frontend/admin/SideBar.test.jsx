import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; // For advanced matchers like toHaveClass
import SideBar from './SideBar';

describe('SideBar component', () => {
  it('renders correctly', () => {
    const { getByText, getByAltText } = render(<SideBar isOpen={true} CloseSideBar={() => {}} ViewActivits={() => {}} />);
    
    expect(getByAltText('profile picture')).toBeInTheDocument();
    expect(getByText('Admin Name')).toBeInTheDocument();
    expect(getByText('Home')).toBeInTheDocument();
    // Add assertions for other menu items
  });

  it('calls CloseSideBar function when close button is clicked', () => {
    const closeSideBarMock = jest.fn();
    const { getByText } = render(<SideBar isOpen={true} CloseSideBar={closeSideBarMock} ViewActivits={() => {}} />);
    
    fireEvent.click(getByText('x'));
    expect(closeSideBarMock).toHaveBeenCalledTimes(1);
  });

  it('calls ViewActivits function with correct parameter when menu item is clicked', () => {
    const viewActivitiesMock = jest.fn();
    const { getByText } = render(<SideBar isOpen={true} CloseSideBar={() => {}} ViewActivits={viewActivitiesMock} />);
    
    fireEvent.click(getByText('Tasks'));
    expect(viewActivitiesMock).toHaveBeenCalledWith('task');
    // Add similar fireEvent calls for other menu items
  });
});
