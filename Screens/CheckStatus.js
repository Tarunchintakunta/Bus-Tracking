import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';

const CheckStatus = ({ navigation }) => {
  const handleCheckBusStatus = () => {
  };

  const handleCheckRoutes = () => {
    // Add logic to navigate to the routes page
  };

  const optimizeroutes = () => {
    // Add logic for optimizing bus routes
  };

  return (
    <View style={styles.container}>
      <Pressable style={styles.optionButton} onPress={handleCheckBusStatus}>
        <Text style={styles.optionText}>Check Bus Condition</Text>
      </Pressable>

      <Pressable style={styles.optionButton} onPress={optimizeroutes}>
        <Text style={styles.optionText}>Optimize the bus routes</Text>
      </Pressable>

      <Pressable style={styles.optionButton} onPress={handleCheckRoutes}>
        <Text style={styles.optionText}>Check Routes</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  optionButton: {
    backgroundColor: '#041E42',
    padding: 20,
    borderRadius: 8,
    marginVertical: 10,
    width: '80%',
  },
  optionText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
  },
});

export default CheckStatus;
