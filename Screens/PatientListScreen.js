import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, TextInput } from 'react-native';
import { useState, useEffect, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import ViewButton from '../Components/ViewButton';
import FabButton from '../Components/FabButton';
import Feather from '@react-native-vector-icons/feather';


import { BACKEND_URL } from '../config';  



const PatientListScreen = ({ navigation }) => { 

const [patients, setPatients] = useState([]);
const [searchPateient, setSearchPatient] = useState('');


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

//filter patient
const filteredPatients = patients.filter(patient => {
   const fullName = `${patient.firstName} ${patient.lastName}`.toLowerCase();
          return fullName.includes(searchPateient.toLowerCase())
})  

const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <TouchableOpacity 
          style={styles.nameContainer}
          onPress={() => navigation.navigate('PatientInfo', { patient: item })} 
      >
        <Text style={styles.patientName}>{item.firstName} {item.lastName}</Text>
      </TouchableOpacity>

      <ViewButton
        onPress={() => navigation.navigate('PatientRecords', { patient: item })}
      />
    </View>
  );

  return (
    <View style={styles.container}> 

    <View style={styles.searchContainer}>
          <Feather 
              name="search" 
              size={20} 
              color="#666" 
              style={styles.searchIcon}
          />
          <TextInput
              style={styles.searchBar}
              placeholder="Search patient by name..."
              value={searchPateient}
              onChangeText={setSearchPatient}
          />
      </View>

      <FlatList 
        data={filteredPatients} // <-- Filtered list used here
        keyExtractor={(item) => item._id.toString()}
        renderItem={renderItem}
        contentContainerStyle={{ padding: 16 }}
      />

      {/* <FlatList //render patient list
        data={patients}
        keyExtractor={(item) => item._id.toString()}
        renderItem={renderItem}
        contentContainerStyle={{ padding: 16 }}
      /> */}
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
    paddingTop: 50,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 10,
    marginTop: -40,
  },
  searchIcon: {
    paddingLeft: 10,
    paddingRight: 5,
  },
  searchBar: { 
    flex: 1,
    paddingVertical: 10,
    paddingRight: 10,
    fontSize: 16,
  },
  nameContainer: {
    flex: 1,
    marginRight: 10,
  },
  itemContainer: {
    flexDirection: 'row',         
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
