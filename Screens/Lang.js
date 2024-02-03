import React, { useState } from 'react';
import { View, Text, FlatList, Pressable, StyleSheet, Image } from 'react-native';

import { useLanguage } from '../LanguageContext';
import { useNavigation } from '@react-navigation/native';

const languages = [
  { id: 'en', name: 'English' },
  { id: 'te', name: 'తెలుగు' },
  { id: 'hi', name: 'हिन्दी' },
];

const Lang = () => {
  const { selectedLanguage, updateLanguage } = useLanguage();
  const navigation = useNavigation();

  const handleLanguageSelect = (languageId) => {
    updateLanguage(languageId);

    if (languageId === 'te') {
      navigation.navigate('Telugu');
    } else if (languageId === 'en') {
      navigation.navigate('Login');
    } else {
      navigation.navigate('Hindi');
    }
  };

  const renderLanguageItem = ({ item }) => (
    <Pressable
      onPress={() => handleLanguageSelect(item.id)}
      style={({ pressed }) => [
        styles.item,
        { backgroundColor: pressed || selectedLanguage === item.id ? '#4CAF50' : 'white' },
      ]}
    >
      <Text style={[styles.itemText, { color: selectedLanguage === item.id ? 'white' : '#000' }]}>
        {item.name}
      </Text>
    </Pressable>
  );

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: 'https://daddyduckinnovationlab.files.wordpress.com/2020/06/bus.gif' }}
        style={styles.logo}
      />
      <Text style={styles.title}>Track Your Bus</Text>
      <Text style={styles.subtitle}>Choose Your Language</Text> 
      <FlatList
        data={languages}
        keyExtractor={(item) => item.id}
        renderItem={renderLanguageItem}
        style={{ marginTop: 20 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 16,
    marginBottom: 20,
  },
  logo: {
    marginTop: 30,
    width: 300,
    height: 200,
    alignSelf: 'center',
  },
  title: {
    fontSize: 45,
    fontWeight: 'bold',
    marginTop: 20,
    color: '#041E42',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 20,
    color: '#041E42',
    textAlign: 'center',
    marginBottom: 10,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginBottom: 8,
    borderRadius: 8,
  },
  itemText: {
    fontSize: 18,
    marginLeft: 8,
  },
});

export default Lang;