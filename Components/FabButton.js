import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const FabButton = ({ onPress }) => {
  return (
    <TouchableOpacity style={styles.fab} onPress={onPress}>
      <Ionicons name="add" size={30} color="white" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
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

export default FabButton;
