
import { NavigationContainer } from '@react-navigation/native'; 
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';


import HomeScreen from './Screens/HomeScreen';
import PatientInfoScreen from './Screens/PatientInfoScreen';
import PatientListScreen from './Screens/PatientListScreen';
import AddPatientScreen from './Screens/AddPatientScreen'; // Correct the casing to match the actual file name

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Back" component={HomeScreen} options={{headerShown: false}}/>
      <Stack.Screen name="AddPatient" component={AddPatientScreen} options={{title: 'Add Patient'}} />
      <Stack.Screen name="PatientInfo" component={PatientInfoScreen} options={{title: 'Patient'}} />
    </Stack.Navigator>
  );
}

function PatientStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="PatientList" component={PatientListScreen} options={{title: 'Patients List'}} />
      <Stack.Screen name="PatientInfo" component={PatientInfoScreen} options={{title: 'Patient'}} />
    </Stack.Navigator>
  );
}

export default function App() {
  
return (
  <NavigationContainer>
    <Tab.Navigator screenOptions={{headerShown: false}}>
      <Tab.Screen 
        name="Home" 
        component={HomeStack}/>
      <Tab.Screen 
        name="Patients List" 
        component={PatientStack} />
    </Tab.Navigator>
    </NavigationContainer>
  );

  
  
}

