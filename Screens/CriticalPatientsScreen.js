import { Feather } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback, useState } from 'react';
import { Alert, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
//import Feather from '@react-native-vector-icons/feather';

import { BACKEND_URL } from '../config';

const CriticalPatientsScreen = ({ route, navigation }) => {
    const [criticalPatients, setCriticalPatients] = useState(null);

    const fetchCriticalPatients = async () => {
        setCriticalPatients(null);

        try {
            const response = await fetch(`${BACKEND_URL}/patients/critical`);

            if (!response.ok) {
                setCriticalPatients([]);
                throw new Error(`Failed to fetch critical patients. Status: ${response.status}`);
            }

            const data = await response.json();
            setCriticalPatients(data);

        } catch (error) {
            console.error("Error fetching critical patients:", error);
            Alert.alert("Error", "Could not load critical patient list.");
            setCriticalPatients([]);
        }
    };

    // Use useFocusEffect to refresh the list every time the screen becomes active
    useFocusEffect(
        useCallback(() => {
            fetchCriticalPatients();
        }, [])
    );

    const renderItem = ({ item }) => {
        const record = item.latestRecord;
        const isCritical = record.classification === 'High' || record.classification === 'Low';

        return (
            <TouchableOpacity
                style={[styles.recordItem, isCritical && styles.criticalBorder]}
                onPress={() => navigation.navigate('PatientRecords', { patient: item } )}
            >
                <View style={styles.recordContent}>
                    <Text style={styles.typeText}>{item.firstName} {item.lastName}</Text>
                    <Text style={styles.valueText}>Latest: {record.type} ({record.value})</Text>
                </View>

                <View style={styles.statusView}>
                    {/* Displaying the critical status */}
                    <View style={styles.classificationView}>
                        <Feather
                            name={'alert-circle'}
                            size={16}
                            color={'#cc2424'}
                        />
                        <Text style={[styles.classificationText, { color: '#cc2424' }]}>
                            {record.classification}
                        </Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    };

    // 1. Loading State Check
    if (criticalPatients === null) {
        return (
            <View style={styles.container}>
                <Text style={styles.loadingText}>Loading critical alerts...</Text>
            </View>
        );
    }

    // 2. Final Render State (when criticalPatients is an Array)
    return (
        <View style={styles.container}>
            <Text style={styles.header}>⚠️ Critical Condition Alerts</Text>

            {criticalPatients.length === 0 ? (
                <Text style={styles.noDataText}>No patients currently in critical condition.</Text>
            ) : (
                <FlatList
                    data={criticalPatients}
                    renderItem={renderItem}
                    keyExtractor={item => item._id.toString()}
                    contentContainerStyle={{ paddingTop: 10 }}
                />
            )}
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#87d7f7ff',
        padding: 10,
    },
    header: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 10,
        color: '#d32f2f',
    }, recordItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 15,
        backgroundColor: '#fff5f5', // Light red background for alert
        borderRadius: 8,
        marginBottom: 8,
        borderLeftWidth: 4,
        borderLeftColor: '#d32f2f', // Red border for critical
    },
    criticalBorder: {
        borderLeftColor: '#d32f2f',
    },
    recordContent: {
        flex: 1,
    },
    typeText: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    valueText: {
        fontSize: 14,
        color: '#666',
    },
    statusView: {
        alignItems: 'flex-end',
    },
    classificationView: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fbe9e7', // Very light red background
        paddingHorizontal: 8,
        paddingVertical: 3,
        borderRadius: 15,
    },
    classificationText: {
        marginLeft: 4,
        fontSize: 12,
        fontWeight: '600',
        color: '#cc2424',
    },
    noDataText: {
        textAlign: 'center',
        marginTop: 50,
        color: '#666',
    },
    loadingText: {
        textAlign: 'center',
        marginTop: 50,
        fontSize: 16,
        color: '#333',
    }
});

export default CriticalPatientsScreen;