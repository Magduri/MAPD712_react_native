import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function PatientInfoScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Patient Information</Text>
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
});
