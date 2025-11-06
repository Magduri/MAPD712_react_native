import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { useState, useEffect, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import ViewButton from '../Components/ViewButton';
import FabButton from '../Components/FabButton';


import { BACKEND_URL } from '../config';  



const PatientListScreen = ({ navigation }) => { 

const [patients, setPatients] = useState([]);


//useEffect(() => {
  const fetchPatients = async () => {
    
    try {
      const response = await fetch(`${BACKEND_URL}/patients`);
      if (response.ok) {
       const data = await response.json();
      setPatients(data);
      } else {
        console.error('Failed to fetch patients:', response.status);
      }
      
    } catch (error) {
      console.error('Error fetching patients:', error);
    } 
  };

 // Refetch patients whenever the screen comes into focus
  useFocusEffect(
    useCallback(() => {
      fetchPatients();
    }, [])
  );

//   fetchPatients();
// }, []);




const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.patientName}>{item.firstName} {item.lastName}</Text>
      <ViewButton
        onPress={() => navigation.navigate('PatientInfo', { patient: item })}
      />
    </View>
  );

  return (
    <View style={styles.container}> 
      <FlatList //render patient list
        data={patients}
        keyExtractor={(item) => item._id.toString()}
        renderItem={renderItem}
        contentContainerStyle={{ padding: 16 }}
      />
      <FabButton onPress={() => navigation.navigate('AddPatient')} />
      <StatusBar style="auto" />
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#87d7f7ff',
    paddingHorizontal: 16,
    paddingTop: 100,
  },
  itemContainer: {
    flexDirection: 'row',          // name and button side by side
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    backgroundColor: 'white',
    marginBottom: 8,
    borderRadius: 8,
  },
  patientName: {
    fontSize: 16,
  },
});

export default PatientListScreen;
