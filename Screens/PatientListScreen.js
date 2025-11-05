import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, FlatList } from 'react-native';
import { useState, useEffect } from 'react';


import { BACKEND_URL } from '../config';  



const PatientListScreen = ({ navigation }) => { 

const [patients, setPatients] = useState([]);

useEffect(() => {
  const fetchPatients = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/patients`);
      const data = await response.json();
      setPatients(data);
    } catch (error) {
      console.error('Error fetching patients:', error);
    }
  };

  fetchPatients();
}, []);


  return (
    <View style={styles.container}>
  
      <FlatList //render patient list
        data={patients}
        keyExtractor={(item) => item._id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
          style={styles.patientItem}
          onPress={() => navigation.navigate('PatientInfo', { patient: item })}>
      <Text>{item.firstName} {item.lastName}</Text>
      <Text>{item.gender} | {item.phone}</Text>
    </TouchableOpacity>
        )}
      />
      <StatusBar style="auto" />
    </View>
  );
}


const styles = StyleSheet.create({
 container: {
    flex: 1,
    backgroundColor: '#87d7f7ff',
    paddingTop: 50, 
    //alignItems: 'center',
    //justifyContent: 'center',
  },
  patientItem: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    marginVertical: 5,
    marginHorizontal: 12,
  },
  patientName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  patientDetails: {
    fontSize: 14,
    color: '#555',
    marginTop: 6,
  },
});

export default PatientListScreen;
