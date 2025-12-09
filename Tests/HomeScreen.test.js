import { fireEvent, render, screen, waitFor } from '@testing-library/react-native';
import { TextInput } from 'react-native';
import HomeScreen from '../Screens/HomeScreen';

// --- 1. MOCK THE CONFIG FILE ---
jest.mock('../config', () => ({
  BACKEND_URL: 'http://localhost:3000'
}));

// --- 2. MOCK THE ICONS (CRITICAL FIX) ---
// We return an object containing BOTH icons used in your app.
// Removed the duplicate mock line that was causing the crash.
jest.mock('@expo/vector-icons', () => ({
  Ionicons: 'Ionicons',
  Feather: 'Feather',
}));

// --- 3. MOCK NAVIGATION ---
// Prevents "Too many re-renders" by using useEffect (runs once)
jest.mock('@react-navigation/native', () => {
  const React = require('react');
  return {
    useNavigation: () => ({
      navigate: jest.fn(),
    }),
    useFocusEffect: (callback) => React.useEffect(callback, []),
  };
});

// --- 4. MOCK THE API ---
global.fetch = jest.fn((url) => {
  if (url.includes('/patients/critical')) {
    return Promise.resolve({
      ok: true,
      json: () => Promise.resolve([
        { 
          _id: '1', 
          firstName: 'John', 
          lastName: 'Doe', 
          latestRecord: { type: 'Blood Pressure', value: '180/100', classification: 'High' }
        }
      ]),
    });
  }
  
  if (url.includes('/patients')) {
    return Promise.resolve({
      ok: true,
      json: () => Promise.resolve([
        { _id: '1', firstName: 'John', lastName: 'Doe' }, 
        { _id: '2', firstName: 'Jane', lastName: 'Smith' },
      ]),
    });
  }

  return Promise.resolve({ ok: false });
});

// --- THE TESTS ---
describe('HomeScreen Integration Test', () => {
  const mockNavigation = { navigate: jest.fn() };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders "Attention Needed" and shows critical patients by default', async () => {
    render(<HomeScreen navigation={mockNavigation} />);

    // 1. Check Header
    expect(screen.getByText('Medicare')).toBeTruthy();
    expect(screen.getByText('⚠️ Attention Needed')).toBeTruthy();

    // 2. Wait for API to load
    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeTruthy();
      expect(screen.getByText('High')).toBeTruthy(); 
    });
  });

  it('switches to "Search Results" when user types', async () => {
    render(<HomeScreen navigation={mockNavigation} />);

    // 1. Find Search Bar
    const searchBar = screen.UNSAFE_getByType(TextInput);

    // 2. Type "Jane"
    fireEvent.changeText(searchBar, 'Jane');

    // 3. Verify Switch
    await waitFor(() => {
      expect(screen.getByText('Search Results')).toBeTruthy();
      expect(screen.getByText('Jane Smith')).toBeTruthy();
    });

    // 4. Verify John Doe is gone
    expect(screen.queryByText('John Doe')).toBeNull();
  });

  it('navigates to PatientRecords when a patient is clicked', async () => {
    render(<HomeScreen navigation={mockNavigation} />);

    // 1. Wait for load
    await waitFor(() => expect(screen.getByText('John Doe')).toBeTruthy());

    // 2. Click
    fireEvent.press(screen.getByText('John Doe'));

    // 3. Verify Navigation
    expect(mockNavigation.navigate).toHaveBeenCalledWith(
      'PatientRecords',
      expect.objectContaining({ 
        patient: expect.objectContaining({ firstName: 'John' }) 
      })
    );
  });
});