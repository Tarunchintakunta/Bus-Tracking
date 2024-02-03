import { StyleSheet, Text, View, SafeAreaView, Image, KeyboardAvoidingView, TouchableOpacity, Pressable } from 'react-native'
import React from 'react'
import Swiper from 'react-native-swiper';
import { useNavigation } from '@react-navigation/native';


const First = () => {
    const navigation = useNavigation();
    const images = [
        
        'https://cdn.dribbble.com/users/3593902/screenshots/6886578/bus-animation-1.gif',
        'https://cdn.dribbble.com/users/3593902/screenshots/8826233/media/10d04bc937cc65568fd00500d8ae4417.gif',

    ];
    return (

        <SafeAreaView style={{ flex: 1, backgroundColor: "white", alignItems: "center" }}>
            <KeyboardAvoidingView>
                <View style={{ alignItems: "center" }}>
                    <Text
                        style={{
                            height: 110,
                            fontSize: 50,
                            fontWeight: "bold",
                            marginTop: 99,
                            color: "#041E42",
                        }}
                    >
                        Track Your Bus
                    </Text>
                </View>
            </KeyboardAvoidingView>
            <View style={{ flex: 1 }}>
                <Swiper style={{}} showsButtons={true}>
                    {images.map((imageUrl, index) => (
                        <View
                            key={index}
                            style={{
                                flex: 4,
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            <Image
                                source={{ uri: imageUrl }}
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    resizeMode: 'cover',
                                }}
                            />
                        </View>
                    ))}
                </Swiper>
            </View>
            {/* <View>
                <Image
                    style={{ width: 310, height: 250 }}
                    source={{
                        uri: "https://t4.ftcdn.net/jpg/01/16/33/03/240_F_116330368_KnvPeIgJt4MsmurjhtpG0YYF8OsDw2F7.jpg"
                    }} />
            </View> */}
            <View style={{ alignItems: "center" }}>
                <Text
                    style={{
                        alignContent:"center",
                        height: 110,
                        fontSize: 16,
                        fontWeight: "bold",
                        marginTop: 35,
                        color: "#041E42",
                    }}
                >
                    Navigating Routes, Connecting Lives:Your Journey,Our Priority!
                </Text>
            </View>
            <View style={{ alignItems: "center" }}>
                <Text
                    style={{
                        height: 90,
                        fontSize: 15,
                        fontWeight: "normal",
                        marginTop: -55,
                        color: "#041E42",
                    }}
                >
                    We provide GPS BUS Tracking system.
                </Text>
            </View>
            <View style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                <TouchableOpacity style={{
                    backgroundColor: '#3498db',
                    padding: 10,
                    borderRadius: 5,
                }}>
                    <Pressable onPress={() => navigation.navigate("Lang")} style={{ marginTop: 2 }}>
                        <Text style={{
                            color: '#fff',
                            fontSize: 16,
                        }}>Lets get started </Text>
                    </Pressable>
                </TouchableOpacity>
            </View>






        </SafeAreaView >
    )
}


export default First

const styles = StyleSheet.create({})