import React, { useEffect, useState } from 'react';
import { Permissions } from 'expo-permissions';
import { PermissionsAndroid} from 'react-native';
import { Text, View, StyleSheet,Image } from 'react-native';
import { Platform } from 'react-native';
import * as Location from 'expo-location';
import { getFirestore, doc, updateDoc } from 'firebase/firestore';
import app from '../backend/config/firebase';

const DriverLocation = () => {
  const [currentLongitude, setCurrentLongitude] = useState('...');
  const [currentLatitude, setCurrentLatitude] = useState('...');
  const [locationStatus, setLocationStatus] = useState('');
  
  const firestore = getFirestore(app);

  useEffect(() => {
    const requestLocationPermission = async () => {
      if (Platform.OS === 'ios') {
        await setInterval(getLocationAsync(),5000);
      } else {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Location Access Required',
            message: 'This App needs to Access your location',
            buttonNeutral: 'Ask me Later',
            buttonNegative: 'Deny',
            buttonPositive: 'Allow',
          },
        );
        if (PermissionsAndroid.RESULTS.GRANTED === granted) {
            getLocationAsync();
        } else {
          setLocationStatus('Permission Denied');
        }
      }
    };

    requestLocationPermission();
    return () => {
      // Cleanup code, if needed
    };
  }, []);

  const getLocationAsync = () => {
    setInterval(async () => { 
    try {
      const location = await Location.getCurrentPositionAsync({});
      setLocationStatus('You are Here');

      const currentLongitude = JSON.stringify(location.coords.longitude);
      const currentLatitude = JSON.stringify(location.coords.latitude);

      setCurrentLongitude(currentLongitude);
      setCurrentLatitude(currentLatitude);

      // Update the location in Firebase
      const driverDocRef = doc(firestore, 'driver', '1214')

      await updateDoc(driverDocRef, {
        latitude: parseFloat(currentLatitude),
        longitude: parseFloat(currentLongitude),
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      setLocationStatus(error.message);
    }
  },5000);
  };

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: 'https://cdn.dribbble.com/users/3593902/screenshots/8852136/day_bus.gif' }}
        style={styles.image}
      />
      <Text style={styles.heading}>Driver Location</Text>
      <Text style={styles.text}>Longitude: {currentLongitude}</Text>
      <Text style={styles.text}>Latitude: {currentLatitude}</Text>
      <Text style={styles.status}>Status: {locationStatus}</Text>
      {locationStatus === 'You are Here' && (
        <Text style={styles.successMessage}>Tracking Started Successfully</Text>
      )}
    </View>
  );
}; 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  image: {
    width: 300,
    height: 350,
    marginBottom: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  text: {
    fontSize: 18,
    marginVertical: 10,
    color: '#555',
  },
  status: {
    fontSize: 18,
    marginVertical: 10,
    color: 'red',
  },
  successMessage: {
    fontSize: 18,
    marginVertical: 10,
    color: 'green',
    fontWeight: 'bold',
  },
});

  export default DriverLocation;
