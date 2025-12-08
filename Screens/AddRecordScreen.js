import { StatusBar } from 'expo-status-bar';
import { StyleSheet, TextInput, Text, View, TouchableOpacity, Alert } from 'react-native';
import { useState } from 'react';


import { BACKEND_URL } from '../config';



const AddRecordScreen = ({ route, navigation }) => {
    const { patient, patientId } = route.params || {};
    if (!patient) {
        return (
            <View>
                <Text>No patient selected.</Text>
            </View>
        );
    }

    const [type, setType] = useState('');
    const [systolic, setSystolic] = useState('');
    const [diastolic, setDiastolic] = useState('');
    const [value, setValue] = useState('');

    const handleSave = async () => {
        const recordValue = type === 'Blood Pressure' ? `${systolic}/${diastolic}` : value;

        //validation
        if (!type || (type === 'Blood Pressure' && (!systolic || !diastolic)) ||
            (type !== 'Blood Pressure' && !value)) {
            Alert.alert('Validation Error', 'Please fill in all fields.');
            return;
        }

        //classification
        let classification = "Unknown";

        if (type === 'Blood Pressure') {
            const systolicNum = Number(systolic);
            const diastolicNum = Number(diastolic);

            //check for High
            if (systolicNum >= 140 || diastolicNum >= 90) {
                classification = "High";
            }
            //check for Low
            else if (systolicNum <= 90 || diastolicNum <= 60) {
                classification = "Low";
            } else {
                classification = "Normal";
            }
        }
        else if (type === "Heart Rate") {
            const hrValue = Number(value);
            // HR Classification: Over 120 bpm is defined as Critical/High
            if (hrValue > 120) {
                classification = "High";
            } else {
                classification = "Normal";
            }
        } else {
            classification = "Unknown";
        }




        // Save the record
        const newRecord = {
            patientId,
            type,
            value: recordValue,
            classification
        };

        try {
            const response = await fetch(`${BACKEND_URL}/clinicaldata`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newRecord),
            });

            if (response.ok) {
                const saved = await response.json();
                console.log("saved clinical data:", saved);

                Alert.alert('Success', 'Record saved successfully!');
                navigation.navigate('RecordDetails', {
                    patient,
                    patientId,
                    //clinicaldata: { type, value: recordValue }
                    clinicaldata: saved
                });

            } else {
                const errorData = await response.text();
                console.error('Error saving record:', errorData);
                Alert.alert('Error', 'Failed to save record.');
            }
        } catch (error) {
            console.error('Fetch error:', error);
            Alert.alert('Error', 'Cannot reach server.');
        }


    };

    return (

        <View style={styles.container}>
            <View style={styles.form}>
                <Text> Name: </Text>
                <Text style={styles.value}> {patient.firstName} {patient.lastName}</Text>
            </View>

            <Text>Record Type:</Text>
            <View style={styles.typeContainer}>
                <TouchableOpacity
                    style={[styles.typeButton, type === 'Blood Pressure' && styles.typeButtonSelected]}
                    onPress={() => setType('Blood Pressure')}
                >
                    <Text style={styles.typeText}>Blood Pressure</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.typeButton, type === 'Heart Rate' && styles.typeButtonSelected]}
                    onPress={() => setType('Heart Rate')}
                >
                    <Text style={styles.typeText}>Heart Rate</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.typeButton, type === 'Respiratory Rate' && styles.typeButtonSelected]}
                    onPress={() => setType('Respiratory Rate')}
                >
                    <Text style={styles.typeText}>Respiratory Rate</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.typeButton, type === 'Blood Oxygen Level' && styles.typeButtonSelected]}
                    onPress={() => setType('Blood Oxygen Level')}
                >
                    <Text style={styles.typeText}>Blood Oxygen Level</Text>
                </TouchableOpacity>
            </View>

            {type === 'Blood Pressure' ? (
                <>
                    <Text style={styles.label}>Systolic:</Text>
                    <TextInput
                        style={styles.input}
                        value={systolic}
                        onChangeText={setSystolic}
                        placeholder="Enter systolic (top number)"
                        keyboardType="numeric" // Makes it numbers-only
                    />
                    <Text style={styles.label}>Diastolic:</Text>
                    <TextInput
                        style={styles.input}
                        value={diastolic}
                        onChangeText={setDiastolic}
                        placeholder="Enter diastolic (bottom number)"
                        keyboardType="numeric"
                    />
                </>
            ) : (
                <>
                    <Text style={styles.label}>Value:</Text>
                    <TextInput
                        style={styles.input}
                        value={value}
                        onChangeText={setValue}
                        placeholder={type ? `Enter ${type} value` : "Enter value"}
                        keyboardType="numeric"
                    />
                </>
            )}

            <TouchableOpacity style={styles.saveButton}
                onPress={async () => {
                    await handleSave();
                    //navigation.navigate('RecordDetails', { patient: patient, patientId: patientId, clinicaldata: { type, value } });
                }}>
                <Text style={styles.saveButtonText}>Save Record</Text>
            </TouchableOpacity>

            <StatusBar style="auto" />
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#87d7f7ff',
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
        alignItems: 'center', // align buttons horizontally
    },
    value: {
        color: '#555',
    },
    typeContainer: {
        flexDirection: 'column',
        marginBottom: 20,
    },
    typeButton: {
        // flex: 1,
        backgroundColor: '#fff',
        borderColor: 'lightgray',
        borderWidth: 1,
        padding: 12,
        borderRadius: 8,
        marginRight: 0,
        marginBottom: 10,
        alignItems: 'center',
    },
    typeButtonSelected: {
        backgroundColor: '#7bcef8ff',
    },
    typeText: {
        fontWeight: '600',
        color: '#555',
    },
    input: {
        height: 40,
        borderColor: 'lightgray',
        borderWidth: 1,
        paddingHorizontal: 10,
        marginBottom: 15,
        backgroundColor: 'white',
        borderRadius: 8,
    },
    saveButton: {
        paddingHorizontal: 25,
        paddingVertical: 10,
        marginHorizontal: 5,
        borderRadius: 8,
        alignItems: 'center',
        alignSelf: 'center',
        backgroundColor: '#6495ED',
    },
    saveButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },

});
export default AddRecordScreen;
