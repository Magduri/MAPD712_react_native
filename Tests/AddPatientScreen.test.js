import { fireEvent, render, screen, waitFor } from '@testing-library/react-native';
import AddPatientScreen from '../Screens/AddPatientScreen';

// 1. MOCK THE CONFIG FILE
jest.mock('../config', () => ({
  BACKEND_URL: 'http://localhost:3000'
}));

// 2. MOCK FETCH (API)
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({
      _id: '123',
      firstName: 'John',
      lastName: 'Doe'
    }),
  })
);

// 3. MOCK NAVIGATION
const mockNavigation = { navigate: jest.fn() };

// 4. MOCK DATE PICKER (External Library)
jest.mock('react-native-modal-datetime-picker', () => {
  const React = require('react');
  const { View, Button } = require('react-native');
  
  // We replace the complex native picker with a simple button we can press
  return ({ isVisible, onConfirm }) => (
    isVisible ? (
      <View>
        <Button 
          testID="confirm-date-btn" 
          title="Confirm Date" 
          onPress={() => onConfirm(new Date('2000-01-01'))} 
        />
      </View>
    ) : null
  );
});

describe('AddPatientScreen Integration Test', () => {
  
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('fills the form and submits a new patient', async () => {
    render(<AddPatientScreen navigation={mockNavigation} />);

    // Fill in the inputs
    fireEvent.changeText(screen.getByPlaceholderText('Enter first name'), 'John');
    fireEvent.changeText(screen.getByPlaceholderText('Enter last name'), 'Doe');
    fireEvent.changeText(screen.getByPlaceholderText('000-000-0000'), '1234567890');
    fireEvent.changeText(screen.getByPlaceholderText('Enter email'), 'john@test.com');
    fireEvent.changeText(screen.getByPlaceholderText('Enter address'), '123 Main St');
    
    // Select Gender (Radio Logic)
    fireEvent.press(screen.getByText('Male'));
    
    // Handle Date Picker interaction
    // 1. Open picker using TEST ID (because text changes based on today's date)
    fireEvent.press(screen.getByTestId('date-picker-button'));
    
    // 2. Confirm date (using the mock button we created above)
    fireEvent.press(screen.getByTestId('confirm-date-btn'));

    // Submit
    fireEvent.press(screen.getByText('Save'));

    // Assertions
    await waitFor(() => {
      // Check if URL is correct
      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining('/patients'), 
        expect.objectContaining({
          method: 'POST',
          body: expect.stringContaining('"firstName":"John"'),
        })
      );
      
      // Check if Gender was sent
      expect(global.fetch).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          body: expect.stringContaining('"gender":"Male"'),
        })
      );
      
      // Check if Date was sent
      expect(global.fetch).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          body: expect.stringContaining('2000-01-01'),
        })
      );
    });

    // Check Navigation
    expect(mockNavigation.navigate).toHaveBeenCalledWith(
      'PatientInfo', 
      expect.any(Object)
    );
  });

  it('shows alert if fields are missing', () => {
    global.alert = jest.fn(); // Mock alert

    render(<AddPatientScreen navigation={mockNavigation} />);
    
    // Press save immediately (empty form)
    fireEvent.press(screen.getByText('Save'));
    
    expect(global.alert).toHaveBeenCalledWith('Please fill in all required fields.');
  });
});