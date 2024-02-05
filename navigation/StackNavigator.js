import { Text, View } from 'react-native';
import React from 'react';
import { NavigationContainer, StackRouter } from '@react-navigation/native';
import First from '../Screens/First';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Lang from '../Screens/Lang';
import Login from '../Screens/Login';
import Telugu from '../Screens/Telugu';
import Hindi from '../Screens/Hindi';
import Student from '../Screens/Student';
import Admin from '../Screens/Admin'; 
import Driver from '../Screens/Driver';
import AdminLogin from '../Screens/Adminlogin';
import CheckStatus from '../Screens/CheckStatus';
import Map from '../Screens/Map';
import AddStudent from '../Screens/AddStudent';
import AddDriver from '../Screens/AddDriver';
import DriverLocation from '../Screens/DriverLocation';


const StackNavigator = () => {
    const Stack = createNativeStackNavigator();
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="First" component={First} options={{ headerShown: false }} />
                <Stack.Screen name="Lang" component={Lang} options={{ headerShown: false }} />
                <Stack.Screen name='Login' component={Login} options={{ headerShown: false }} />
                <Stack.Screen name='Telugu' component={Telugu} options={{ headerShown: false }} />
                <Stack.Screen name='Hindi' component={Hindi} options={{ headerShown: false }} />
                <Stack.Screen name='Student' component={Student} options={{ headerShown: false }} />
                <Stack.Screen name='Admin' component={Admin} options={{ headerShown: false }} />
                <Stack.Screen name='Driver' component={Driver} options={{ headerShown: false }} />
                <Stack.Screen name='AdminLogin' component={AdminLogin} options={{ headerShown: false }} />
                <Stack.Screen name="CheckStatus" component={CheckStatus} options={{headerShown: false}}/>
                <Stack.Screen name='Map' component={Map} options={{headerShown: false}}/>
                <Stack.Screen name='AddStudent' component={AddStudent} options={{headerShown: false}}/>
                <Stack.Screen name='AddDriver' component={AddDriver} options={{headerShown: false}}/>
                <Stack.Screen name='DriverLocation' component={DriverLocation} options={{headerShown: false}}/>            
                

            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default StackNavigator;
