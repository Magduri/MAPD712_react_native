import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native'; 
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';

import HomeScreen from './Screens/HomeScreen';
import PatientsScreen from './Screens/PatientsScreen';
import PatientListScreen from './Screens/PatientListScreen';
import AddPatientScreen from './Screens/AddPatientScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="HomeMain" component={HomeScreen} options={{headerShown: false}}/>
      <Stack.Screen name="AddPatient" component={AddPatientScreen} options={{title: 'Add Patient'}} />
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
        name="Patients" 
        component={PatientsScreen} />
      <Tab.Screen 
        name="Patient List" 
        component={PatientListScreen} />
    </Tab.Navigator>
    </NavigationContainer>
  );

  
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#87d7f7ff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
