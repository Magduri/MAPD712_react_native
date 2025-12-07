import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, FlatList, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import Feather from '@react-native-vector-icons/feather';
import FabButton from '../Components/FabButton'; 
import ViewButton from '../Components/ViewButton';
import SearchContainer from '../Components/SearchContainer';

import { BACKEND_URL } from '../config'; 

const HomeScreen = ({ navigation }) => {
  const [searchPatient, setSearchPatient] = useState('');
  
  const [criticalPatients, setCriticalPatients] = useState([]);
  const [patients, setPatients] = useState([]); 
  const [isLoading, setIsLoading] = useState(true);

  // Fetch All Patients 
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

  // Fetch Critical Patients 
  const fetchCriticalPatients = async () => {
      setIsLoading(true);
      try {
          const response = await fetch(`${BACKEND_URL}/patients/critical`);
          if (!response.ok) {
              setCriticalPatients([]);
              throw new Error(`Failed to fetch. Status: ${response.status}`);
          }
          const data = await response.json();
          setCriticalPatients(data);
      } catch (error) {
          console.error("Error fetching critical patients:", error);
      } finally {
          setIsLoading(false);
      }
  };

  //call BOTH fetches when screen focuses
  useFocusEffect(
      useCallback(() => {
          fetchCriticalPatients();
          fetchPatients(); 
      }, [])
  );

  // Filtering 
  const filteredPatients = patients.filter(patient => {
      const fullName = `${patient.firstName} ${patient.lastName}`.toLowerCase();
      return fullName.includes(searchPatient.toLowerCase());
  });

  // Render Item for SEARCH RESULTS
  const renderSearchItem = ({ item }) => (
    <View style={styles.searchResultItem}>
        <View>
            <Text style={styles.searchName}>{item.firstName} {item.lastName}</Text>
            {/* <Text style={styles.searchId}>ID: {item._id.slice(-4)}</Text>  */}
        </View>
        
        <ViewButton
        onPress={() => navigation.navigate('PatientRecords', { patient: item })}
      />
    </View>);

  // Render Item for CRITICAL Dashboard
  const renderCriticalItem = ({ item }) => {
    if (!item.latestRecord) return null;
    const record = item.latestRecord;
    
    return (
        <TouchableOpacity
            style={styles.recordItem}
            onPress={() => navigation.navigate('PatientRecords', { patient: item } )}
        >
            <View style={styles.recordContent}>
                <Text style={styles.patientName}>{item.firstName} {item.lastName}</Text>
                <Text style={styles.valueText}>Latest: {record.type} ({record.value})</Text>
            </View>

            <View style={styles.statusView}>
                <View style={styles.classificationView}>
                    <Feather name={'alert-circle'} size={16} color={'#cc2424'} />
                    <Text style={styles.classificationText}>{record.classification}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      
      <View style={styles.headerContainer}>
        <Text style={styles.appTitle}>Medicare</Text>
        <Text style={styles.subTitle}>Welcome back, Iffat</Text>
      </View>
      <SearchContainer 
          value={searchPatient} 
          onChangeText={setSearchPatient} 
          onClear={() => setSearchPatient('')}
      /> 

  
      
      {searchPatient.length > 0 ? (
          <View style={{ flex: 1 }}>
             <Text style={styles.sectionTitle}>Search Results</Text>
             <FlatList 
                data={filteredPatients}
                renderItem={renderSearchItem}
                keyExtractor={item => item._id.toString()}
                contentContainerStyle={{ paddingBottom: 80, paddingTop: 10 }}
                ListEmptyComponent={<Text style={styles.noDataText}>No patients found.</Text>}
             />
          </View>
      ) : (
          <>
            <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>⚠️ Critical Attention Needed</Text>
            </View>

            {isLoading ? (
                <ActivityIndicator size="large" color="#d32f2f" style={{ marginTop: 20 }} />
            ) : (
                <FlatList
                data={criticalPatients}
                renderItem={renderCriticalItem}
                keyExtractor={item => item._id.toString()}
                contentContainerStyle={{ paddingBottom: 80 }} 
                ListEmptyComponent={
                    <Text style={styles.noDataText}>No critical alerts at the moment.</Text>
                }
                />
            )}
          </>
      )}

      <FabButton onPress={() => navigation.navigate('AddPatient')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#87d7f7ff',
    paddingTop: 10, 
    paddingHorizontal: 20,
  },
  headerContainer: {
    marginBottom: 20,
  },
  appTitle: {
    fontStyle: 'italic',
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
  },
  subTitle: {
    fontSize: 16,
    color: '#e1f5fe',
    marginTop: 5,
  },
  sectionHeader: {
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#d32f2f', 
    marginBottom: 10,
  },
  searchResultItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
   patientName: {
    fontSize: 16,
  },
  searchId: {
    fontSize: 12,
    color: '#666',
  },
  recordItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#fff5f5', 
    borderRadius: 12,
    marginBottom: 10,
    borderLeftWidth: 5,
    borderLeftColor: '#d32f2f',
    elevation: 2,
  },
  recordContent: {
    flex: 1,
  },
  patientName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  valueText: {
    fontSize: 14,
    color: '#555',
  },
  statusView: {
    alignItems: 'flex-end',
  },
  classificationView: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffcdd2', 
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },
  classificationText: {
    marginLeft: 4,
    fontSize: 12,
    fontWeight: '700',
    color: '#b71c1c',
  },
  noDataText: {
    textAlign: 'center',
    color: '#fff',
    marginTop: 20,
    fontStyle: 'italic',
  }
});

export default HomeScreen;