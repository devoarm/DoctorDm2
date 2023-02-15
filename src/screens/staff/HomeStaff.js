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
import {Avatar, Divider} from 'react-native-paper';
import React from 'react';
import Background from '../../themes/BackGroundSession';
import Attention from '../../components/Attention';
import Icon from 'react-native-vector-icons/FontAwesome5';
import auth from '@react-native-firebase/auth';
import {useNavigation} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
export default function HomeStaffScreen() {
  const user = useSelector(state => state.user);  
  const navigation = useNavigation();
  const handleLogout = () => {
    Alert.alert('ยืนยัน', 'คุณต้องการออกจากระบบ ใช่หรือไม่?', [
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
                  source={require('../../../assets/person.png')}
                />
              )}
            </View>
            <View style={{marginHorizontal: 5}}>
              <Text
                style={{textAlign: 'left', fontSize: 14, color: Colors.black}}>
                สวัดดีค่ะ ({user.role})
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
                  source={require('../../../assets/icon/edit.png')}
                  style={{width: 22, height: 23}}
                  name="user-cog"
              />
          </TouchableWithoutFeedback>
          </View>
          <View style={{marginHorizontal: 5}}>
          <TouchableWithoutFeedback onPress={handleLogout}>
              <Image
                  source={require('../../../assets/icon/logout.png')}
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
            source={require('../../../assets/banner.png')}
            style={{width: 337,height: 177}}
          /></View>
          <Text
            style={{
              marginTop: 10,
              marginLeft: 45,
              fontSize: 18,
              color: Colors.black,
            }}>
            เมนูให้บริการ
          </Text>
          <View style={styles.rowCard}>
            <TouchableWithoutFeedback
              onPress={() => {
                navigation.navigate('users');
              }}>
              <View style={styles.box}>
                <Image
                  source={require('../../../assets/card/patient.png')}
                  style={{width: 102, height: 88}}
                />
                <Text style={{marginTop: 5, textAlign: 'center'}}>
                  จัดการข้อมูล{'\n'}ผู้ใช้งาน
                </Text>
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback
              onPress={() => {
                navigation.navigate('appoint');
              }}>
              <View style={styles.box}>
                <Image
                  source={require('../../../assets/card/schedule.png')}
                  style={{width: 102, height: 88}}
                />
                <Text style={{marginTop: 5, textAlign: 'center'}}>
                  จัดการข้อมูล{'\n'}กำหนดการ
                </Text>
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback
              onPress={() => {
                navigation.navigate('detailRegister');
              }}>
              <View style={styles.box}>
                <Image
                  source={require('../../../assets/card/checklist.png')}
                  style={{width: 102, height: 88}}
                />
                <Text style={{marginTop: 5, textAlign: 'center'}}>
                  จัดการข้อมูล{'\n'}ลงทะเบียน
                </Text>
              </View>
            </TouchableWithoutFeedback>
          </View>
      </SafeAreaView>
    </Background>
  );
}

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
    flexDirection: 'row',
    justifyContent: 'flex-start',
    padding:20,
  },
  box: {
    marginHorizontal: 5,
    padding: 10,
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
  detail: {
    fontSize: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  }
});
