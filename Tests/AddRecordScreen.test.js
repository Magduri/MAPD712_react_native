import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react-native';
import AddRecordScreen from '../Screens/AddRecordScreen';

global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({ _id: '123', classification: 'Normal' }),
  })
);

const mockNavigation = {
  navigate: jest.fn(),
};

const mockRoute = {
  params: {
    patient: { firstName: 'John', lastName: 'Doe' },
    patientId: 'patient_123'
  }
};

describe('AddRecordScreen Integration Test', () => {

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the patient name correctly', () => {
    render(<AddRecordScreen route={mockRoute} navigation={mockNavigation} />);
    
    expect(screen.getByText(/John Doe/)).toBeTruthy();
  });

  it('saves Blood Pressure correctly (Logic & Network Test)', async () => {
    render(<AddRecordScreen route={mockRoute} navigation={mockNavigation} />);

    fireEvent.press(screen.getByText('Blood Pressure'));
    const sysInput = screen.getByPlaceholderText('Enter systolic (top number)');
    const diaInput = screen.getByPlaceholderText('Enter diastolic (bottom number)');
    fireEvent.changeText(sysInput, '120');
    fireEvent.changeText(diaInput, '80');
    fireEvent.press(screen.getByText('Save Record'));

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining('/clinicaldata'), 
        expect.objectContaining({
          method: 'POST',
          body: expect.stringContaining('"type":"Blood Pressure"'),
        })
      );
      
      expect(global.fetch).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          body: expect.stringContaining('"value":"120/80"'),
        })
      );
    });
  });

  it('saves Heart Rate correctly with dynamic input', async () => {
    render(<AddRecordScreen route={mockRoute} navigation={mockNavigation} />);

    fireEvent.press(screen.getByText('Heart Rate'));
    const input = screen.getByPlaceholderText('Enter Heart Rate value');
    fireEvent.changeText(input, '130');
    fireEvent.press(screen.getByText('Save Record'));

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
           body: expect.stringContaining('"value":"130"')
        })
      );
    });
  });
});