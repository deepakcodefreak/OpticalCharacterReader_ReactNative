import React, { Component } from 'react';
import { Button, Text, View } from 'react-native';
import styles from '../../styles';

const HomeScreen = ({ navigation }) => (
  <View style={styles.container}>
    <Text style={styles.title}>Welcome to OC Reader</Text>
    <Text>Tap on the below Button to optically read characters from an image</Text>
    <View style={styles.button}>
      <Button
        title="Press Me"
        onPress={() => navigation.navigate('ImagePicker')}
        style={styles.button}
      />
    </View>
  </View>
);

HomeScreen.navigationOptions = {
  header: null,
};

export default HomeScreen;

