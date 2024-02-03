import React from 'react';
import { SafeAreaView, StyleSheet, Text, View, Image, Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const Login = () => {
  const navigation = useNavigation();

  const handleOptionPress = (option) => {
    if (option === 'student') {
      navigation.navigate('Student');
    } else if (option === 'driver') {
      navigation.navigate('Driver');
    } else if (option === 'admin') {
      navigation.navigate('AdminLogin');
    }
  };

  const handleReturnPress = () => {
    navigation.navigate('Lang');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={{ uri: 'data:image/png;base64,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' }}
        style={styles.logo}
      />
      <Text style={styles.title}>Track Your Bus</Text>
      <View style={styles.optionsContainer}>
        <Pressable style={styles.optionButton} onPress={() => handleOptionPress('student')}>
          <Icon name="ios-school" size={20} color="white" />
          <Text style={styles.optionText}>I am a Student</Text>
        </Pressable>
        <Pressable style={styles.optionButton} onPress={() => handleOptionPress('driver')}>
          <Icon name="ios-bus" size={20} color="white" />
          <Text style={styles.optionText}>I am a Driver</Text>
        </Pressable>
        <Pressable style={styles.optionButton} onPress={() => handleOptionPress('admin')}>
          <Icon name="ios-person" size={20} color="white" />
          <Text style={styles.optionText}>I am an Admin</Text>
        </Pressable>
      </View>
      <Pressable style={styles.returnButton} onPress={handleReturnPress}>
        <Text style={styles.returnButtonText}>Return</Text>
      </Pressable>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 300,
    height: 200,
    resizeMode: 'contain',
    marginBottom: 10,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#041E42',
    marginBottom: 20,
  },
  optionsContainer: {
    marginTop: 20,
    width: '80%',
  },
  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#041E42',
    borderRadius: 8,
    marginVertical: 10,
    alignItems: 'center',
  },
  optionText: {
    color: 'white',
    fontSize: 18,
    marginLeft: 10,
  },
  returnButton: {
    backgroundColor: '#3498db',
    padding: 15,
    borderRadius: 8,
    marginTop: 20,
  },
  returnButtonText: {
    color: 'white',
    fontSize: 18,
  },
});

export default Login;
