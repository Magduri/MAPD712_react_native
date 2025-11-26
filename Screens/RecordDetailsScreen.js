import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Feather from '@expo/vector-icons/Feather';


import { BACKEND_URL } from '../config';

const RecordDetailsScreen = ({ route, navigation }) => {
  const { patient, patientId } = route.params || {};
  const recordData = route.params?.clinicaldata ?? {};

  //if clinicalData is not provided
  const classification = recordData.classification ?? 'Unknown';
  const isHigh = classification === 'High';
  const isLow = classification === 'Low';
  const isCritical = isHigh || isLow;

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
          <Text style={styles.value}> {recordData.type}</Text>
        </View>
        <View style={styles.divider} />

        <View style={styles.row}>
          <Text style={styles.label}> Value: </Text>
          <Text style={styles.value}> {recordData.value}</Text>
        </View>
      
      <View style={styles.divider} />

      {/* Classification row with Feather icon */}
      <View style={[styles.row, styles.classRow]}>
        <Text style={styles.label}> Status: </Text>

        <View style={styles.statusContainer}>
          <Feather
            name={isCritical? 'alert-circle' : 'check-circle'}
            size={22}
            color={isCritical ? '#cc2424' : '#2ea44f'}
           accessibilityLabel={
          isLow 
              ? 'Low blood pressure or heart rate' 
              : isHigh 
                  ? 'High blood pressure or heart rate' 
                  : 'Normal'}
          />
          <Text style={[styles.value, { marginLeft: 8 }]}>
            {classification}
          </Text>
        </View>
      </View>
</View>

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
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  }

});

export default RecordDetailsScreen;
