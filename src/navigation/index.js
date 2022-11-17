import {StyleSheet, Text, View} from 'react-native';
import React, {useState, useEffect} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();
import Home from '../screens/Home';
import Login from '../auth/Login';
import Register from '../auth/Register';
import RegisterGoogle from '../auth/RegisterGoogle';
import Loading from '../screens/Loading';
import PatientRegisterScreen from '../screens/PatientRegister';

const InitNavigation = () => {
  return (
    <Stack.Navigator
    initialRouteName='loading'
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="loading" component={Loading} />
      <Stack.Screen name="login" component={Login} />
      <Stack.Screen name="register" component={Register} />
      <Stack.Screen name="home" component={Home} />
      <Stack.Screen name="registerGoogle" component={RegisterGoogle} />
      <Stack.Screen name="patientRegister" component={PatientRegisterScreen} />
    </Stack.Navigator>
  );
};

export default InitNavigation;

const styles = StyleSheet.create({});
