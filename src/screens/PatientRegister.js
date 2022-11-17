import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import SessionBg from '../themes/BackGroundSession';
import Icon from 'react-native-vector-icons/FontAwesome5';
import BtGoBack from '../components/BtGoBack';
const PatientRegisterScreen = () => {
  return (
    <SessionBg>
      <BtGoBack/>
    </SessionBg>
  );
};

export default PatientRegisterScreen;

const styles = StyleSheet.create({});
