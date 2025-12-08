import React, { useState, useContext } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { AuthContext } from '../AuthContext'; 

const LoginScreen = () => {
  const { signIn } = useContext(AuthContext); 

  return (
    <View style={styles.container}>
      <Text style={styles.title}>MediCare</Text>
      <TextInput style={styles.input} placeholder="Email " />
      <TextInput style={styles.input} placeholder="Password " secureTextEntry />
      
      <Button title="Login" onPress={() => signIn()} /> 
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: 'center',
    backgroundColor: '#87d7f7ff',
     padding: 20 
    },
  title: { 
    fontSize: 30, 
    textAlign: 'center', 
    color: '#fff',
    marginBottom: 20 
},
  input: { 
    borderWidth: 1, 
   borderColor: '#ddd',
    backgroundColor: '#fff5f5',
    borderRadius: 5, 
    height: 50,
    padding: 10, 
    marginBottom: 15 
}
});

export default LoginScreen;