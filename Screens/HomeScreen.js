import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import FabButton from '../Components/FabButton';


const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Medicare!</Text>
      <StatusBar style="auto" />

      {/* <Text>Upcoming Appointments</Text>
      <Text>Recent Patients</Text> */}
      <FabButton onPress={() => navigation.navigate('AddPatient')} />
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
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'white',
  },
});

export default HomeScreen;
