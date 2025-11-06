
import { NavigationContainer } from '@react-navigation/native'; 
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';


import HomeScreen from './Screens/HomeScreen';
import PatientInfoScreen from './Screens/PatientInfoScreen';
import PatientListScreen from './Screens/PatientListScreen';
import AddPatientScreen from './Screens/AddPatientScreen'; // Correct the casing to match the actual file name



export default function App() {

  const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="HomeScreen" component={HomeScreen} options={{title: 'Home'}}/>
      <Stack.Screen name="AddPatient" component={AddPatientScreen} options={{title: 'Add Patient'}} />
      <Stack.Screen name="PatientInfo" component={PatientInfoScreen} options={{title: 'Patient Info'}} />
    </Stack.Navigator>
  );
}

const PatientStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="PatientListScreen" component={PatientListScreen} options={{title: 'Patients List'}} />
      <Stack.Screen name="PatientInfo" component={PatientInfoScreen} options={{title: 'Patient Info'}} />
      <Stack.Screen name="AddPatient" component={AddPatientScreen} options={{title: 'Add Patient'}} />
    </Stack.Navigator>
  );
}
  
return (
  <NavigationContainer>
    <Tab.Navigator screenOptions={{headerShown: false}}>
      <Tab.Screen name="HomeTab" component={HomeStack} options={{ title: "Home"}}/>
      <Tab.Screen name="PatientsTab" component={PatientStack} options={{ title: "Patients List"}}/>
    </Tab.Navigator>
    </NavigationContainer>
  );

  
  
}

