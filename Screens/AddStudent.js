import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet,Image } from 'react-native';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import app from '../backend/config/firebase';

const AddStudent = () => {
  const [studentName, setStudentName] = useState('');
  const [studentRollNumber, setStudentRollNumber] = useState('');
  const [studentBranch, setStudentBranch] = useState('');
  const [Route, setRoute] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const firestore = getFirestore(app);
  const auth = getAuth(app);

  const handleAddStudent = async () => {
    try {
      // 1. Create a new user with Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const { user } = userCredential;

      // 2. Add user details to Firestore
      const userDocRef = doc(firestore, 'students', studentRollNumber);
      await setDoc(userDocRef, {
        name: studentName,
        rollNumber: studentRollNumber,
        branch: studentBranch,
        route: Route,
        // Add more user details as needed
      });

      setStudentName('');
      setStudentRollNumber('');
      setStudentBranch('');
      setRoute('');
      setEmail('');
      setPassword('');
      setSuccessMessage('Student details added successfully!');
    } catch (error) {
      console.error('Firebase Authentication Error:', error);
      setSuccessMessage('Error adding student details.');
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPRsiFLCgSrw3A9xknJ2Vc_hPTYpBy3pkTHQ&usqp=CAU' }}
        style={styles.logo}
      />
      
      <Text style={styles.title}>Add Student</Text>

      <TextInput
        style={styles.input}
        placeholder="Student Name"
        value={studentName}
        onChangeText={(text) => setStudentName(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Student Roll Number"
        value={studentRollNumber}
        onChangeText={(text) => setStudentRollNumber(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Student Branch"
        value={studentBranch}
        onChangeText={(text) => setStudentBranch(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Student Route"
        value={Route}
        onChangeText={(text) => setRoute(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry={true}
        value={password}
        onChangeText={(text) => setPassword(text)}
      />

      <Pressable style={styles.adfirestoreutton} onPress={handleAddStudent}>
        <Text style={styles.buttonText}>Add Student</Text>
      </Pressable>

      {successMessage !== '' && <Text style={styles.successMessage}>{successMessage}</Text>}
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
  logo: {
    width: 300,
    height: 200,
    resizeMode: 'contain',
    marginBottom: -10,
  },
  title: {
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
  adfirestoreutton: {
    backgroundColor: '#041E42',
    padding: 10,
    borderRadius: 8,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  successMessage: {
    color: 'green',
    marginTop: 10,
  },
});

export default AddStudent;