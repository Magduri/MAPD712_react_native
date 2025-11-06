import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

import { BACKEND_URL } from '../config';

const PatientInfoScreen = ({ route, navigation }) => {
  const { patient } = route.params;
  if (!patient) {
    return (
      <View style={styles.container}>
        <Text>No patient data available.</Text>
      </View>
    );
  }

  const dob = new Date(patient.dob); // convert string back to Date

  return (
    <View style={styles.container}>

      {/* <Text style={styles.title}>Patient Information</Text> */}
      {/* <Image source={{ uri: photo }} style={styles.photo} /> */}
      <View style={styles.form}>
        <View style={styles.row}>
          <Text style={styles.label}> First Name: </Text>
          <Text style={styles.value}> {patient.firstName}</Text>
        </View>
        <View style={styles.divider} />

        <View style={styles.row}>
          <Text style={styles.label}> Last Name: </Text>
          <Text style={styles.value}> {patient.lastName}</Text>
        </View>
        <View style={styles.divider} />

        <View style={styles.row}>
          <Text style={styles.label}>Date of Birth:</Text>
          <Text style={styles.value}>
            {`${(dob.getMonth() + 1).toString().padStart(2, '0')}/${dob.getDate().toString().padStart(2, '0')
              }/${dob.getFullYear()}`}
          </Text>
        </View>
        <View style={styles.divider} />

        <View style={styles.row}>
          <Text style={styles.label}> Gender: </Text>
          <Text style={styles.value}> {patient.gender}</Text>
        </View>
        <View style={styles.divider} />

        <View style={styles.row}>
          <Text style={styles.label}> Phone: </Text>
          <Text style={styles.value}> {patient.phone}</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.row}>
          <Text style={styles.label}> Email: </Text>
          <Text style={styles.value}> {patient.email}</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.row}>
          <Text style={styles.label}> Address: </Text>
          <Text style={styles.value}> {patient.address}</Text>
        </View>
      </View>
       

       <TouchableOpacity style={styles.addRecordButton} 
       onPress={() => navigation.navigate('AddRecord', { patientId: patient._id, patient: patient })}>
        <Text style={styles.addRecordButtonText}>Add Records</Text>
      </TouchableOpacity>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#87d7f7ff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  form: {
    width: '90%',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginBottom: 20,
  },

  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  label: {
    fontWeight: '600',
    color: '#333',
  },
  value: {
    color: '#555',
  },
  divider: {
    height: 1,
    backgroundColor: '#ddd',
  },
  addRecordButton: {
  backgroundColor: '#7bcef8ff',
  paddingVertical: 10,
  paddingHorizontal: 20,
  borderRadius: 8,
  marginTop: 20,
  alignItems: 'center',
},
addRecordButtonText: {
  color: 'white',
  fontWeight: '600',
  fontSize: 16,
}

});

export default PatientInfoScreen;
