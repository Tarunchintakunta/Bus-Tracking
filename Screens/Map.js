import {Alert, Dimensions, StyleSheet, Text, View, TouchableOpacity, Pressable } from 'react-native';
import * as Location from 'expo-location';
import React, { useState, useEffect } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { Ionicons } from '@expo/vector-icons';
import * as geolib from 'geolib';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import app from '../backend/config/firebase';
import * as Notifications from 'expo-notifications';
//import * as Device from "expo-device';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export default function App() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [latitude, setLatitude] = useState(1);
  const [longitude, setLongitude] = useState(1); 
  const [pushToken, setPushToken] = useState('');
  const firestore = getFirestore(app);

  async function registerForPushNotificationsAsync() {
    let token;

    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
    }
    if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!');
        return;
    }
    token = (await Notifications.getExpoPushTokenAsync(
      {projectId: 'c5489059-6924-4b35-9f3a-53e8b84cb948'},
    )).data;

    setPushToken(token);
    console.log(token);

    return token;
}
  useEffect(() => {
    (async () => {
      registerForPushNotificationsAsync().then(token => {
        console.log(token);
        setPushToken(token);
      })
      .catch(err => console.log(err));
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);

      getLocation();
    })();
  }, [])

  const calculateDistance = () => {
     
    const lat = location.coords.latitude;
    const lon = location.coords.longitude;

    const dist = geolib.getDistance(
     {lat,lon},
      {latitude,longitude}
     );
    if(dist < 500)
    {
      setDistNotification();
    }
    
  }
  
  const setDistNotification = async () => {

    const msg1 = {
      to: pushToken,
      sound: "default",
      title: "Bus Arrival",
      body: "The bus will arrive in about 5 minutes",
    }; 

    console.log('Hello' ,msg1);
    await fetch("https://exp.host/--/api/v2/push/send", {
    method: "POST",
    headers: {
      host: "exp.host",
      accept: "application/json",
      "accept-encoding": "gzip, deflate",
      "content-type": "application/json",
    },
    body: JSON.stringify(msg1),
  }); 
};

  
  const getLocation = async () => {
    setInterval(async () => { 
    
    const docRef = doc(firestore, 'driver', '1214');
    const docSnap = await getDoc(docRef);
    
    const latitude = docSnap.data()['latitude'];
    const longitude = docSnap.data()['longitude'];

    setLatitude(latitude);
    setLongitude(longitude)
    //busIsInFence();
    //calculateDistance();
  },5000);
};

   fence = [
    { latitude: 17.420428132673873, longitude: 78.65561298276637 },
    { latitude: 17.419890702852403, longitude: 78.65527234229116 },
    { latitude: 17.420069846294908, longitude: 78.65491560856262 },
    { latitude: 17.42054329599547, longitude: 78.65537426626445 },]
    
    const fenceNotification = async () => {

      const msg2 = {
        to: pushToken,
        sound: "default",
        title: "Bus Status",
        body: "Bus is out of fenced area",
      }; 
  
      await fetch("https://exp.host/--/api/v2/push/send", {
      method: "POST",
      headers: {
        host: "exp.host",
        accept: "application/json",
        "accept-encoding": "gzip, deflate",
        "content-type": "application/json",
      },
      body: JSON.stringify(msg2),
    }); 
  };


  const handleSOSPress = () => {
    console.log('SOS pressed!');
    calculateDistance();
    //busIsInFence();
    // You can add alert, send message, or call emergency services
  };


  const handleCallDriverPress = () => {
    console.log('Calling the driver...');
    busIsInFence();
   };

  let text = 'Waiting...';

  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }


  function busIsInFence(){
    let bol = geolib.isPointInPolygon({ latitude: latitude, longitude: longitude }, fence);
    
    if (!bol) {
      fenceNotification();
    }

  }

  return (
    
    <View style={styles.container}>
      <MapView
        showsMyLocationButton={true}
        showsUserLocation={true}
        style={styles.map}
        initialRegion={{
          latitude: location ? location.coords.latitude : latitude,
          longitude: location ? location.coords.longitude : longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
          
        }}
      >
        {location && (
          <Marker
            coordinate={{
              latitude: latitude,
              longitude: longitude,
            }}
            title="Your Location"
            description="You are here!"
            image="https://static.thenounproject.com/png/1661272-200.png"
          />
        )}
      </MapView>

      <View style={styles.infoBox}>
        <View style={styles.infoRow}>
          <Ionicons name="ios-walk" size={24} color="black" />
          <Text style={styles.infoText}>0 km remaining</Text>
        </View>
        <View style={styles.infoRow}>
          <Ionicons name="ios-time" size={24} color="black" />
          <Text style={styles.infoText}>Estimated Arrival: Arrived</Text>
        </View>
        <View style={styles.infoRow}>
          <Ionicons name="ios-alert" size={24} color="red" />
          <Text style={styles.infoText}>Delay: 5 mins</Text>
        </View>
      </View>
      

      <View style={styles.sosButtonContainer}>
        {/* SOS Button */}
        <TouchableOpacity style={styles.sosButton} onPress={handleSOSPress}>
          <Ionicons name="ios-alert" size={30} color="white" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.callDriverButton} onPress={handleCallDriverPress}>
            <Ionicons name="ios-call" size={30} color="white" />
          </TouchableOpacity>
      </View>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  sosButtonContainer: {
    position: 'absolute',
    top: 450,
    right: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sosButton: {
    width: 40,
    height: 40,     
    bottom:-159,
    borderRadius: 20,
    marginLeft:8,
    backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoBox: {
    position: 'absolute',
    bottom: 63,
    left: 16,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 8,
    elevation: 5,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  infoText: {
    marginLeft: 8,
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 8,
  },
  callDriverButton: {
    width: 40,
    height: 40,
    bottom: -169,
    borderRadius: 20,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },
});