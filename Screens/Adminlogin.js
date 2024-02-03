import React, { useState } from 'react';
import { View, Text, Image, TextInput, Pressable, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import app from '../backend/config/firebase'; 
import { signInWithEmailAndPassword } from 'firebase/auth';
import { getAuth } from 'firebase/auth';
const AdminLogin = () => {
  const navigation = useNavigation();
  const [adminId, setAdminId] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleLoginPress = async () => {
    try {

      if(adminId=='admin' && password=='password')
      // If login is successful, navigate to the Admin screen
      {
        navigation.navigate('Admin');
      }
    } catch (error) {
      // Handle login errors
      setErrorMessage('Incorrect details. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: 'https://t4.ftcdn.net/jpg/03/08/46/37/360_F_308463755_ywYBIYdIV3cpa1ma4TzR0kOvh73kwrVk.jpg' }} // Replace with your actual image URL
        style={styles.image}
      />

      <Text style={styles.loginText}>Login to your account</Text>

      <TextInput
        style={styles.input}
        placeholder="Admin ID"
        value={adminId}
        onChangeText={(text) => setAdminId(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry={true}
        value={password}
        onChangeText={(text) => setPassword(text)}
      />

      <Pressable style={styles.loginButton} onPress={handleLoginPress}>
        <Text style={styles.loginButtonText}>Login</Text>
      </Pressable>

      {errorMessage !== '' && (
        <Text style={styles.errorText}>{errorMessage}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#fff',
  },
  image: {
    width: 200,
    height: 250,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  loginText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#041E42',
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 16,
    padding: 8,
  },
  loginButton: {
    backgroundColor: '#041E42',
    padding: 10,
    borderRadius: 8,
    width: '80%',
    alignItems: 'center',
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  errorText: {
    color: 'red',
    marginTop: 10,
  },
});

export default AdminLogin;