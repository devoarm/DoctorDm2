import {StyleSheet, Text, View, TouchableWithoutFeedback} from 'react-native';
import React from 'react';
import Colors from '../themes/Colors';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {useNavigation} from '@react-navigation/native';
const BtGoBack = () => {
  const navigation = useNavigation();
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        navigation.goBack();
      }}>
      <View style={styles.container}>
        <Icon name="arrow-left" size={20} />
      </View>
    </TouchableWithoutFeedback>
  );
};

export default BtGoBack;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    margin: 10,
    padding: 15,
    borderRadius: 10,
    width: 60,
    backgroundColor: Colors.yellow,
    opacity:0.7,
  },
});
