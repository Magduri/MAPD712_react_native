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
    const [value, setValue] = useState('');

    const handleSave = async () => {
        if (!type || !value) {
            Alert.alert('Validation', 'Please select a type and enter a value.');
            return;
        }

        // Save the record
        const newRecord = {
            patientId,
            type,
            value,
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
                Alert.alert('Success', 'Record saved successfully!');
                navigation.goBack(); // go back to previous screen
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
            </View>
            <Text style={styles.label}>Value:</Text>
            <TextInput
                style={styles.input}
                value={value}
                onChangeText={setValue}
                placeholder="Enter value"
            />
            <TouchableOpacity style={styles.saveButton}
                onPress={async () => {
                    await handleSave();
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
        flexDirection: 'row',
        marginBottom: 20,
    },
    typeButton: {
        flex: 1,
        backgroundColor: '#fff',
        borderColor: 'lightgray',
        borderWidth: 1,
        padding: 12,
        borderRadius: 8,
        marginRight: 10,
        alignItems: 'center',
    },
    typeButtonSelected: {
        backgroundColor: '#7bcef8ff',
    },
    typeText: {
        fontWeight: '600',
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
        backgroundColor: '#7bcef8ff',
    },
    saveButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});
export default AddRecordScreen;
