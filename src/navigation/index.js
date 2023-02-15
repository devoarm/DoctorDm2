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
import HealthCheckScreen from '../screens/HealthCheck';
import ResultHealtCheckScreen from '../screens/ResultHealtCheck';
import ResultHealtCareScreen from '../screens/ResultHealtCare';
import AppointScreen from '../screens/staff/Appoint';
import UserManagePage from '../screens/staff/users';
import DetailUserPage from '../screens/staff/users/DetailUser';
import SelectYear from '../screens/staff/users/SelectYear';
import ReportUserScreen from '../screens/staff/users/ReportUser';
import MyProfile from '../screens/MyProfile';
import EditUser from '../screens/staff/users/EditUser';
import DetailRegister from '../screens/staff/DetailRegister';
import ResultHealtAfterCheck from '../screens/ResultHealtAfterCheck';
import MakerMap from '../screens/staff/MakerMap';
import MapHealPosition from '../screens/MapHealPosition';
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
      <Stack.Screen name="healthCheck" component={HealthCheckScreen} />
      <Stack.Screen name="resultHealthCheck" component={ResultHealtCheckScreen} />
      <Stack.Screen name="resultHealthCare" component={ResultHealtCareScreen} />
      <Stack.Screen name="resultHealtAfterCheck" component={ResultHealtAfterCheck} />
      <Stack.Screen name="appoint" component={AppointScreen} />
      <Stack.Screen name="users" component={UserManagePage} />
      <Stack.Screen name="detailUser" component={DetailUserPage} />
      <Stack.Screen name="selectYear" component={SelectYear} />
      <Stack.Screen name="reportUser" component={ReportUserScreen} />
      <Stack.Screen name="myProfile" component={MyProfile} />
      <Stack.Screen name="editUser" component={EditUser} />
      <Stack.Screen name="detailRegister" component={DetailRegister} />
      <Stack.Screen name="makerMap" component={MakerMap} />
      <Stack.Screen name="mapHealPosition" component={MapHealPosition} />
    </Stack.Navigator>
  );
};

export default InitNavigation;

const styles = StyleSheet.create({});
