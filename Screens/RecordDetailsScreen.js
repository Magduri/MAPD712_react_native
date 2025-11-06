import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

import { BACKEND_URL } from '../config';

const RecordDetailsScreen = ({ route, navigation }) => {
  const { patient, patientId } = route.params || {};
  const { clinicaldata } = route.params || {};


  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <View style={styles.row}>
          <Text style={styles.label}> Name: </Text>
          <Text style={styles.value}> {patient.firstName} {patient.lastName}</Text>
        </View>
        <View style={styles.divider} />

        <View style={styles.row}>
          <Text style={styles.label}> Record Type: </Text>
          <Text style={styles.value}> {clinicaldata.type}</Text>
        </View>
        <View style={styles.divider} />

        <View style={styles.row}>
          <Text style={styles.label}> Value: </Text>
          <Text style={styles.value}> {clinicaldata.value}</Text>
        </View>
      </View>
       

       {/* <TouchableOpacity style={styles.addRecordButton} 
       onPress={() => navigation.navigate('AddRecord', { patientId: patient._id, patient: patient })}>
        <Text style={styles.addRecordButtonText}>Add Records</Text>
      </TouchableOpacity> */}

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
//   addRecordButton: {
//   backgroundColor: '#7bcef8ff',
//   paddingVertical: 10,
//   paddingHorizontal: 20,
//   borderRadius: 8,
//   marginTop: 20,
//   alignItems: 'center',
// },
// addRecordButtonText: {
//   color: 'white',
//   fontWeight: '600',
//   fontSize: 16,
// }

});

export default RecordDetailsScreen;
