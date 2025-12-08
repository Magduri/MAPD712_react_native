import { StatusBar } from 'expo-status-bar';
import { StyleSheet, FlatList, Text, View, TouchableOpacity, Alert, Button } from 'react-native';
import { useEffect, useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import Feather from '@react-native-vector-icons/feather';
import PatientRecordChart from '../Components/PatientRecordChart';


import { BACKEND_URL } from '../config';

const PatientRecordsScreen = ({ route, navigation }) => {
    const { patient } = route.params;
    const patientId = patient._id;
    const [records, setRecords] = useState(null);
    const [showChart, setShowChart] = useState(false);

    const fetchPatientRecords = async () => {
        setRecords(null);

        try {
            const response = await fetch(`${BACKEND_URL}/clinicaldata/patients/${patientId}`);

            if (!response.ok) {
                setRecords([]);
                throw new Error(`Failed to fetch patient records:`, response.status);
            }
            const data = await response.json();
            // Sort by measuredDateTime descending (most recent first)
            data.sort((a, b) => new Date(b.measuredDateTime) - new Date(a.measuredDateTime));

            setRecords(data);
        } catch (error) {
            console.error("Error fetching records:", error);
            Alert.alert("Error", "Could not load patient records.");
            setRecords([]);
        }
    }

    useEffect(() => {
        fetchPatientRecords();
    }, [patientId]// or [] if patientId never changes

    );

    // format the date/time display
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
        return new Date(dateString).toLocaleTimeString('en-US', options);
    };

// Convert DB records into Chart Data
const getChartData = () => {
        if (!records || records.length === 0) return null;

        // Filter ONLY for "Blood Pressure" records that have both numbers
        const bpRecords = records
            .filter(r => r.type === 'Blood Pressure' && r.systolic && r.diastolic)
            .slice(0, 6); // Top 6 most recent
        
        // Reverse chart reads Old -> New
        const dataToChart = [...bpRecords].reverse();

        if (dataToChart.length === 0) return null;

        return {
            labels: dataToChart.map(r => {
                const d = new Date(r.measuredDateTime);
                return `${d.getMonth()+1}/${d.getDate()}`;
            }),
            datasets: [
                // Systolic (Upper number) - Red Color
                {
                    data: dataToChart.map(r => r.systolic),
                    color: (opacity = 1) => `rgba(255, 0, 0, ${opacity})`, // Red
                    strokeWidth: 2
                },
                // Diastolic (Lower number) - Blue Color
                {
                    data: dataToChart.map(r => r.diastolic),
                    color: (opacity = 1) => `rgba(0, 0, 255, ${opacity})`, // Blue
                    strokeWidth: 2
                }
            ],
            legend: ["Systolic", "Diastolic"] 
        };
    };

    // Render each record item

    const renderRecordItem = ({ item }) => {
        const isCritical = item.classification === 'High' || item.classification === 'Low';


        return (
            <TouchableOpacity
                style={[styles.recordItem, isCritical && styles.criticalBorder]}

                onPress={() => navigation.navigate('RecordDetails', { clinicaldata: item, patient: patient })}
            >
                <View style={styles.recordContent}>
                    <Text style={styles.typeText}>{item.type}</Text>
                    <Text style={styles.valueText}>{item.value}</Text>
                </View>

                <View style={styles.statusView}>
                    <Text style={styles.dateText}>{formatDate(item.measuredDateTime)}</Text>
                    <View style={styles.classificationView}>
                        <Feather
                            name={isCritical ? 'alert-circle' : 'check-circle'}
                            size={16}
                            color={isCritical ? '#cc2424' : '#2ea44f'}
                        />
                        <Text style={[styles.classificationText, isCritical && { color: '#cc2424' }]}>
                            {item.classification}
                        </Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    };

    // 1. Loading State (when records is null) 
    if (records === null) {
        return (
            <View style={styles.container}>
                <Text style={styles.loadingText}>Loading clinical records...</Text>
            </View>
        );
    }

    // 2. final render state when records is an Array (either empty or full)
    return (
        <View style={styles.container}>
            <Text style={styles.header}>
                Records for: {patient.firstName} {patient.lastName}
            </Text>

            {/* Button to navigate to Add Record Screen */}
            <TouchableOpacity
                style={styles.addRecordButton}
                onPress={() => navigation.navigate('AddRecord', {
                    patient: patient,
                    patientId: patientId
                })}
            >
                <Text style={styles.addRecordButtonText}>+ Add New Record</Text>
            </TouchableOpacity>

            {records.length === 0 ? (
                <Text style={styles.noDataText}>No clinical data has been recorded for this patient.</Text>
            ) : (
                <FlatList
                    style={{ flex: 1 }}
                    data={records}
                    renderItem={renderRecordItem}
                    keyExtractor={item => item._id.toString()}
                />
            )}

            {/*The Button and The Chart */}
            <View style={ styles.chartButton}>
               <TouchableOpacity 
                style={styles.chartButton} 
                onPress={() => setShowChart(!showChart)}
            >
                <Text style={{ color: 'white', fontSize: 16 }}>
                    {showChart ? "Hide Chart" : "Show Data"}
                </Text>
                </TouchableOpacity>
                
                {showChart && (
                    <View style={{ marginTop: 10, alignItems: 'center' }}>
                        <PatientRecordChart data={getChartData()} />
                        <Text style={{fontSize: 12, color: 'gray', marginTop: 5}}>
                            Showing recent Blood Pressure readings
                        </Text>
                    </View>
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: '#87d7f7ff',
    },
    header: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 10,
    },
    addRecordButton: {
        backgroundColor: '#6495ED',
        padding: 12,
        borderRadius: 8,
        alignItems: 'center',
        marginBottom: 15,
        elevation: 2,
        shadowColor: '#483D8B',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    },
    addRecordButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    recordItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 15,
        backgroundColor: 'white',
        borderRadius: 8,
        marginBottom: 8,
        borderLeftWidth: 4,
        borderLeftColor: '#7bcef8ff', // Default blue border
    },
    criticalBorder: {
        borderLeftColor: '#cc2424', // Red border for critical records
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
        color: '#333',
    },
    statusView: {
        alignItems: 'flex-end',
    },
    dateText: {
        fontSize: 10,
        color: '#999',
        marginBottom: 5,
    },
    classificationView: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#eee',
        paddingHorizontal: 8,
        paddingVertical: 3,
        borderRadius: 15,
    },
    classificationText: {
        marginLeft: 4,
        fontSize: 12,
        fontWeight: '600',
        color: '#2ea44f',
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
    },
    chartButton: {
        backgroundColor: '#6495ED',
        padding: 4,
        borderRadius: 8,
        alignItems: 'center',
        marginBottom: 15,
        elevation: 2,
}
});

export default PatientRecordsScreen;