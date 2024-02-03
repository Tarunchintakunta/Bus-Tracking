import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet,Image } from 'react-native';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import app from '../backend/config/firebase';

const AddDriver = () => {
    const [driverName, setdriverName] = useState('');
    const [driverId, setdriverId] = useState('');
    const [RouteNo, setRouteNo] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const firestore = getFirestore(app);
    const auth = getAuth(app);

    const handleAdddriver = async () => {
        try{
            const userDocRef = doc(firestore, 'driver', driverId);
            
            await setDoc(userDocRef, {
            DriverName: driverName,
            DriverId: driverId,
            RouteNo: RouteNo,
            latitude: '',
            longitude: '',
            timestamp: '',
            // Add more user details as needed
      });
        

        setdriverName('');
        setdriverId('');
        setRouteNo('');
        setSuccessMessage('Driver added successfully!');
    }
    catch (error) {
            console.error('Firebase Authentication Error:', error);
            setSuccessMessage('Error adding student details.');
          }
        };

    return (
        <View style={styles.container}>
            <Image
        source={{ uri: 'https://www.shutterstock.com/image-vector/vector-illustration-bus-driver-driving-600nw-1688601415.jpg' }}
        style={styles.logo}
      />
            <Text style={styles.title}>Add driver</Text>

            <TextInput
                style={styles.input}
                placeholder="driver Name"
                value={driverName}
                onChangeText={(text) => setdriverName(text)}
            />
            <TextInput
                style={styles.input}
                placeholder="driver Id"
                value={driverId}
                onChangeText={(text) => setdriverId(text)}
            />
            <TextInput
                style={styles.input}
                placeholder="driver Route"
                value={RouteNo}
                onChangeText={(text) => setRouteNo(text)}
            />


            <Pressable style={styles.addButton} onPress={handleAdddriver}>
                <Text style={styles.buttonText}>Add driver</Text>
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
    addButton: {
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

export default AddDriver;
