import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image } from 'react-native';
import { useState } from 'react';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { Ionicons } from '@expo/vector-icons';
import { ScrollView } from 'react-native';
import { KeyboardAvoidingView, Platform } from 'react-native';

import { BACKEND_URL } from '../config';



const AddPatientScreen = ({ navigation }) => {

  // const [photo, setPhoto] = useState(null);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState(new Date());
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);
  const [gender, setGender] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');

  const showDatePicker = () => setDatePickerVisible(true);
  const hideDatePicker = () => setDatePickerVisible(false);
  const handleConfirm = (date) => {
    setDateOfBirth(date);
    hideDatePicker();
  };

  const handleSave = async () => {
    if (!firstName || !lastName || !dateOfBirth || !gender || !phoneNumber || !email || !address) {
      alert('Please fill in all required fields.');
      return;
    }
    //prepare patient data
    const newPatient = {
      // photo,
      firstName,
      lastName,
      dob: dateOfBirth.toISOString(),
      gender,
      phone: phoneNumber,
      email,
      address,
    };
    // Send the patient data to the backend
    try {
      const response = await fetch(`${BACKEND_URL}/patients`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newPatient),
      });
      //check response status
      if (response.ok) {
        const savedPatient = await response.json();
        console.log('Patient saved successfully:', savedPatient);

        //navigate to patientInfo screen with the saved patient data
        navigation.navigate('PatientInfo', { patient: savedPatient });
      } else {
        const errorData = await response.text();
        console.error('Error saving patient:', errorData);
        alert('Failed to save patient. Please try again.');
      }
    } catch (error) {
      console.error('Fetch error:', error);
      alert('Cannot reach server. Make sure the backend is running.');
    }

  }


  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}
        style={{ backgroundColor: '#87d7f7ff' }}>
        {/* <TouchableOpacity style={styles.photoCircle} onPress={() => alert('Camera / Gallery')}>
          {photo ? (
            <Image source={{ uri: photo }} style={styles.photoImage} />
          ) : (
            <Ionicons name="camera" size={35} color="#87d7f7ff" />
          )}
        </TouchableOpacity> */}

        <View style={styles.form}>
          <Text>First Name:</Text>
          <TextInput style={styles.input} value={firstName} onChangeText={setFirstName} placeholder='Enter first name' />
          <Text>Last Name:</Text>
          <TextInput style={styles.input} value={lastName} onChangeText={setLastName} placeholder='Enter last name' />

          <Text>Date of Birth:</Text>
          <TouchableOpacity style={styles.dateBox} onPress={showDatePicker}>
            <Text style={styles.dateText}>
              {dateOfBirth
                ? `${(dateOfBirth.getMonth() + 1).toString().padStart(2, '0')}/${dateOfBirth.getDate().toString().padStart(2, '0')}/${dateOfBirth.getFullYear()}`
                : 'mm/dd/yyyy'}
            </Text>
          </TouchableOpacity>

          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            date={dateOfBirth}
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
          />

          <Text>Gender:</Text>

          <View style={styles.genderContainer}>
            <TouchableOpacity style={styles.radioOption} onPress={() => setGender('Male')}>
              <View style={[styles.radioOuter, gender === 'Male' && styles.radioOuterSelected]}>
                {gender === 'Male' && <View style={styles.radioInner} />}
              </View>
              <Text style={styles.genderText}>Male</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.radioOption} onPress={() => setGender('Female')}>
              <View style={[styles.radioOuter, gender === 'Female' && styles.radioOuterSelected]}>
                {gender === 'Female' && <View style={styles.radioInner} />}
              </View>
              <Text style={styles.genderText}>Female</Text>
            </TouchableOpacity>
          </View>

          <Text>Phone Number:</Text>
          <TextInput style={styles.input} value={phoneNumber} onChangeText={setPhoneNumber} placeholder='000-000-0000' keyboardType='number-pad' />
          <Text>Email:</Text>
          <TextInput style={styles.input} value={email} onChangeText={setEmail} placeholder='Enter email' keyboardType='email-address' />
          <Text>Address:</Text>
          <TextInput style={styles.input} value={address} onChangeText={setAddress} placeholder='Enter address' />
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={[styles.button, styles.saveButton]}
            onPress={async () => { await handleSave(); 
              navigation.navigate('PatientList');
            }}>
            <Text style={styles.buttonText}>Save</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={() => alert('Action cancelled')}>
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
        <StatusBar style="auto" />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    //flex: 1,
    //backgroundColor: '#87d7f7ff',
    alignItems: 'center',
    paddingVertical: 20,
    //justifyContent: 'center',
  },
  photoCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: 'white',
  },

  photoImage: {
    width: '100%',
    height: '100%',
    borderRadius: 50,
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

  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    width: '90%',
    paddingHorizontal: 10,
    marginBottom: 15,
    backgroundColor: 'white',
  },
  dateBox: {
    height: 40,
    width: '80%',
    borderColor: 'gray',
    borderWidth: 1,
    justifyContent: 'center',
    paddingHorizontal: 10,
    backgroundColor: 'white',
    marginBottom: 15,
  },
  dateText: {
    fontSize: 16,
  },
  genderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  radioOption: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 25,
  },

  radioOuter: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#555', // circle border before selection
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 6,
  },

  radioOuterSelected: {
    borderColor: '#87d7f7ff', // border highlight when selected
  },

  radioInner: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: '#87d7f7ff', // filled circle color
  },

  genderText: {
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '60%',
  },
  button: {
    flex: 1,
    paddingVertical: 10,
    marginHorizontal: 5,
    borderRadius: 8,
    alignItems: 'center',
  },
  saveButton: {
    backgroundColor: '#7bcef8ff',
  },
  cancelButton: {
    backgroundColor: '#7bcef8ff',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AddPatientScreen;
