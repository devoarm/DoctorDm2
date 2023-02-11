import * as React from 'react';

import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Alert,
  TouchableWithoutFeedback,
  SafeAreaView,
  Image,
} from 'react-native';
import Background from '../themes/BackGroundSession';
import {useForm, Controller} from 'react-hook-form';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {useSelector, useDispatch} from 'react-redux';
import {Avatar, Divider} from 'react-native-paper';
import Colors from '../themes/Colors';
import auth from '@react-native-firebase/auth';
import {useNavigation} from '@react-navigation/native';
import { transparent } from 'react-native-paper/lib/typescript/styles/themes/v2/colors';

const HomeScreen = () => {
  const user = useSelector(state => state.user);
  const navigation = useNavigation();

  const handleLogout = () => {
    Alert.alert('ยืนยัน', 'คุณต้องการออกจากระบบ จริงหรือไม่?', [
      {
        text: 'ยกเลิก',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: 'ยืนยัน',
        onPress: () => {
          auth()
            .signOut()
            .then(() => navigation.replace('login'));
        },
      },
    ]);
  };
  return (
    <Background>
      <SafeAreaView style={{flex: 1}}>
          <View style={styles.user}>
          <View style={{marginHorizontal: 20,marginEnd:20}}>
              {user.photoURL ? (
                <Avatar.Image size={50} source={{uri: user.photoURL}} />
              ) : (
                <Avatar.Image
                  size={50}
                  source={require('../../assets/person.png')}
                />
              )}
            </View>
            <View style={{marginEnd:5}}>
              <Text
                style={{textAlign: 'left', fontSize: 14, color: Colors.black}}>
                สวัดดีค่ะ
              </Text>
              <Text
                style={{textAlign: 'left', fontSize: 18, color: Colors.black}}>
                คุณ {user.f_name} {user.l_name}
              </Text>
            </View>
            <View style={{marginHorizontal: 10}}>
            <TouchableWithoutFeedback
            onPress={() => {
              navigation.navigate('myProfile');
            }}>
              <Image
                  source={require('../../assets/icon/edit.png')}
                  style={{width: 22, height: 23}}
                  name="user-cog"
              />
          </TouchableWithoutFeedback>
          </View>
          <View style={{marginHorizontal: 5}}>
          <TouchableWithoutFeedback onPress={handleLogout}>
              <Image
                  source={require('../../assets/icon/logout.png')}
                  style={{width: 22, height: 23, marginVertical:5}}
                  name="sign-out-alt"
              />
          </TouchableWithoutFeedback>
          </View>
          </View>
          <Divider
            bold
            style={{backgroundColor: Colors.black, marginHorizontal: 10,marginBottom: 30,}}
          />
          <View style={styles.image}>
          <Image 
            source={require('../../assets/banner.png')}
            style={{width: 337,height: 177}}
          /></View>
          <Text
            style={{
              marginTop: 10,
              marginLeft: 20,
              fontSize: 18,
              color: Colors.black,
            }}>
            เมนูให้บริการ
          </Text>
          <ScrollView
          contentContainerStyle={{flexGrow: 1, justifyContent: 'center'}}>
          <View style={styles.rowCard}>
            <TouchableWithoutFeedback
              onPress={() => {
                navigation.navigate('schedule');
              }}>
              <View style={styles.box}>
                <Image
                  source={require('../../assets/card/schedule.png')}
                  style={{width: 102, height: 87}}
                />
                <Text style={{marginTop: 5, textAlign: 'center'}}>
                  กำหนดการ{'\n'}ตรวจสุขภาพ
                </Text>
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback
              onPress={() => {
                navigation.navigate('patientRegister');
              }}>
              <View style={styles.box}>
                <Image
                  source={require('../../assets/card/checklist.png')}
                  style={{width: 102, height: 87}}
                />
                <Text style={{marginTop: 5, textAlign: 'center'}}>
                  ลงทะเบียนตรวจ{'\n'}สุขภาพประจำปี
                </Text>
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback
              onPress={() => {
                navigation.navigate('healthCheck');
              }}>
              <View style={styles.box}>
                <Image
                  source={require('../../assets/card/stethoscope.png')}
                  style={{width: 102, height: 87}}
                />
                <Text style={{marginTop: 5, textAlign: 'center'}}>
                  ตรวจสุขภาพ{'\n'}ด้วยตนเอง
                </Text>
              </View>
            </TouchableWithoutFeedback>
          </View>
          <View style={styles.rowCard}>
          <TouchableWithoutFeedback
              onPress={() => {
                navigation.navigate('resultHealthCheck');
              }}>
              <View style={styles.box}>
                <Image
                  source={require('../../assets/card/profile.png')}
                  style={{width: 102, height: 87}}
                />
                <Text style={{marginTop: 5, textAlign: 'center'}}>
                  ภาวะ{'\n'}สุขภาพ
                </Text>
              </View>
            </TouchableWithoutFeedback>
          <TouchableWithoutFeedback
              onPress={() => {
                navigation.navigate('doctorAdvice');
              }}>
              <View style={styles.box}>
                <Image
                  source={require('../../assets/card/doctor.png')}
                  style={{width: 102, height: 87}}
                />
                <Text style={{marginTop: 5, textAlign: 'center'}}>
                  คำแนะนำ{'\n'}การดูแลรักษา
                </Text>
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback
              onPress={() => {
                navigation.navigate('resultHealthCare');
              }}>
              <View style={styles.box}>
                <Image
                  source={require('../../assets/card/clinic-history.png')}
                  style={{width: 102, height: 87}}
                />
                <Text style={{marginTop: 5, textAlign: 'center'}}>
                  ผลการดูแล{'\n'}รักษาสุขภาพ
                </Text>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </ScrollView>
      </SafeAreaView>
    </Background>
  );
};

const styles = StyleSheet.create({
  headers: {
    margin: 20,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  user: {
    marginTop: 20,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  text: {
    color: 'black',
    fontSize: 25,
    lineHeight: 84,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  rowCard: {
    flex: 1,
    marginHorizontal: 5,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    padding:1,
  },
  box: {
    marginHorizontal: 5,
    marginBottom: 5,
    marginTop: 5,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    backgroundColor: 'transparent',
  },
  image:{
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
});

export default HomeScreen;
