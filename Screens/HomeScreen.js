import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';


export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Medicare!</Text>
      <StatusBar style="auto" />

      <Text>Upcoming Appointments</Text>
      <Text>Recent Patients</Text>

      <TouchableOpacity style={styles.fab} onPress={() => navigation.navigate('AddPatient')}>
        <Ionicons name="add" size={30} color="white" />
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  fab: {
    position: 'absolute',
    width: 60,
    height: 60,
    alignSelf: 'flex-end',
    bottom: 30,
    right: 30,
    backgroundColor: '#7bcef8ff',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: 'white',
    shadowOffset: { width: 4, height: 2 },
    shadowOpacity: 0.7,
    shadowRadius: 3,
    elevation: 5,
  },
});
