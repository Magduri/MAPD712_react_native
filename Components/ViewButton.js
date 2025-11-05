import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const ViewButton = ({ onPress }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.text}>View</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#7bcef8ff',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  text: {
    color: 'white',
    fontWeight: '600',
  },
});

export default ViewButton;
