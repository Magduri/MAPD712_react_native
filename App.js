
import { AuthContext } from './AuthContext';
import { useState, useMemo } from 'react';

import { NavigationContainer } from '@react-navigation/native'; 
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';



import HomeScreen from './Screens/HomeScreen';
import PatientInfoScreen from './Screens/PatientInfoScreen';
import PatientListScreen from './Screens/PatientListScreen';
import AddPatientScreen from './Screens/AddPatientScreen'; 
import AddRecordScreen from './Screens/AddRecordScreen';
import RecordDetailsScreen from './Screens/RecordDetailsScreen';
import PatientRecordsScreen from './Screens/PatientRecordsScreen';
import CriticalPatientsScreen from './Screens/CriticalPatientsScreen';
import LoginScreen from './Screens/LogInScreen';




export default function App() {

  const Tab = createBottomTabNavigator();
  const Stack = createStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="HomeScreen" component={HomeScreen} options={{title: 'MediCare'}}/>
      <Stack.Screen name="PatientRecords" component={PatientRecordsScreen} options={{title: 'Records'}} />
      <Stack.Screen name="AddPatient" component={AddPatientScreen} options={{title: 'Add Patient'}} />
      <Stack.Screen name="PatientInfo" component={PatientInfoScreen} options={{title: 'Patient Info'}} />
      <Stack.Screen name="AddRecord" component={AddRecordScreen} options={{title: 'Add Record'}} />
      <Stack.Screen name="RecordDetails" component={RecordDetailsScreen} options={{title: 'Record Details'}} />
    </Stack.Navigator>
  );
}

const PatientStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="PatientListScreen" component={PatientListScreen} options={{title: 'Patients List'}} />
      <Stack.Screen name="PatientRecords" component={PatientRecordsScreen} options={{title: 'Records'}} />
      <Stack.Screen name="PatientInfo" component={PatientInfoScreen} options={{title: 'Patient Info'}} />
      <Stack.Screen name="AddPatient" component={AddPatientScreen} options={{title: 'Add Patient'}} />
      <Stack.Screen name="AddRecord" component={AddRecordScreen} options={{title: 'Add Record'}} />
      <Stack.Screen name="RecordDetails" component={RecordDetailsScreen} options={{title: 'Record Details'}} />
    </Stack.Navigator>
  );
}

const CriticalStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="CriticalList"  component={CriticalPatientsScreen} options={{ title: 'Critical Alerts' }} />
     <Stack.Screen name="PatientRecords" component={PatientRecordsScreen} options={{title: 'Records'}} /> 
      <Stack.Screen name="RecordDetails" component={RecordDetailsScreen} options={{title: 'Record Details'}} />
      <Stack.Screen name="AddRecord" component={AddRecordScreen} options={{title: 'Add Record'}} />
    </Stack.Navigator>
  );
}


  //AUTH LOGIC 
  const [userToken, setUserToken] = useState(null);

  const authContext = useMemo(() => ({
    signIn: () => {
      setUserToken('fake-token'); 
    },
    signOut: () => {
      setUserToken(null); 
    },
  }), 
  []);
  
// return (
//   <NavigationContainer>
//     <Tab.Navigator screenOptions={{headerShown: false}}>
//       <Tab.Screen name="Home" component={HomeStack} options={{ unmountOnBlur: true }}/>
//       <Tab.Screen name="Patients" component={PatientStack} options={{ title: "Patients List"}}/>
//       <Tab.Screen name="Critical" component={CriticalStack} options={{ title: "Critical Patients List"}}/>
//     </Tab.Navigator>
//   </NavigationContainer>
//   );
//}
return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        {userToken === null ? (
          <Stack.Navigator>
            <Stack.Screen name="Login" component={LoginScreen} options={{headerShown: false}}/>
          </Stack.Navigator>
        ) : (
          <Tab.Navigator screenOptions={{headerShown: false}}>
            <Tab.Screen name="Home" component={HomeStack} options={{ unmountOnBlur: true }}/>
            <Tab.Screen name="Patients" component={PatientStack} options={{ title: "Patients List"}}/>
            <Tab.Screen name="Critical" component={CriticalStack} options={{ title: "Critical Patients List"}}/>
          </Tab.Navigator>
        )}
      </NavigationContainer>
    </AuthContext.Provider>
  );
}
  


