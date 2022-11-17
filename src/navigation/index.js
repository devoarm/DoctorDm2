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
import ResultPatientRegisterScreen from '../screens/ResultPatientRegister';
import ScheduleScreen from '../screens/Schedule';
import AdviceScheduleScreen from '../screens/AdviceSchedule';
import DoctorAdvice from '../screens/DoctorAdvice';

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
      <Stack.Screen name="resultPatientRegister" component={ResultPatientRegisterScreen} />
      <Stack.Screen name="schedule" component={ScheduleScreen} />
      <Stack.Screen name="adviceSchedule" component={AdviceScheduleScreen} />
      <Stack.Screen name="doctorAdvice" component={DoctorAdvice} />
    </Stack.Navigator>
  );
};

export default InitNavigation;

const styles = StyleSheet.create({});
