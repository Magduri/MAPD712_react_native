import React, { useState, useContext } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { AuthContext } from '../AuthContext'; 

const LoginScreen = () => {
  const { signIn } = useContext(AuthContext); 

  return (
    <View style={styles.container}>
      <Text style={styles.title}>MediCare</Text>
      <TextInput style={styles.input} placeholder="Email " />
      <TextInput style={styles.input} placeholder="Password " secureTextEntry />
      
      {/* <Button title="Login" onPress={() => signIn()} />  */}
      <TouchableOpacity style={styles.loginButton} onPress={() => signIn()}>
   <Text style={styles.loginButtonText}>LOG IN</Text>
</TouchableOpacity>
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
},
loginButton: {
    backgroundColor: '#6495ED', 
    paddingVertical: 15,        
    borderRadius: 30,           
    alignItems: 'center',       
    marginTop: 20,             
    elevation: 5,               
    shadowColor: '#483D8B',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  
  loginButtonText: {
    color: 'white',             
    fontSize: 18,               
    fontWeight: 'bold',         
    letterSpacing: 1,           
  }
});

export default LoginScreen;