import {
  Button,
  StyleSheet,
  View,
  TextInput,
  Alert,
  Image,
  ScrollView,
  TouchableWithoutFeedback,
  Pressable,
} from 'react-native';
import React from 'react';
import {Text} from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';
import Background from '../../../themes/BackGroundSession';
import CardBorder from '../../../components/CardBorder';
import Colors from '../../../themes/Colors';
import BtGoBack from '../../../components/BtGoBack';
import {useSelector, useDispatch} from 'react-redux';
export default function DetailUserPage({route, navigation}) {
  const {userData} = route.params;
  
  const [passwordChang, setPasswordChang] = React.useState('');
  const user = useSelector(state => state.user);
  const [statusChangePassword, setStatusChangePassword] = React.useState(false);
  const onChangePassword = async () => {
    try {
      const res = await firestore()
        .collection(`users`)
        .doc(userData.key)
        .update({password: passwordChang});
      Alert.alert('สำเร็จ', 'เปลี่ยนรหัสผ่านสำเร็จ');
      setStatusChangePassword(false);
      setPasswordChang('');
    } catch (error) {
      Alert.alert('ไม่สำเร็จ', 'กรุณาลองใหม่อีกครั้ง!');
    }
  };
  const onSetToAdmin = async () => {
    try {
      const res = await firestore()
        .collection(`users`)
        .doc(userData.key)
        .update({role: 'staff'});
      Alert.alert('สำเร็จ', 'ให้สิทธิเป็นเจ้าหน้าที่สำเร็จ');
    } catch (error) {
      Alert.alert('ไม่สำเร็จ', 'กรุณาลองใหม่อีกครั้ง!');
    }
  };
  const onDelete = async () => {
    Alert.alert('แจ้งเตือน!', 'ยืนยันการลบบัญชี?', [
      {
        text: 'ยกเลิก',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: 'ยืนยัน',
        onPress: async () => {
          try {
            const res = await firestore()
              .collection(`users`)
              .doc(userData.key)
              .delete();
            Alert.alert('สำเร็จ', 'ลบบัญชีสำเร็จ');
            navigation.navigate('users');
          } catch (error) {
            console.log(error.message);
            Alert.alert('ไม่สำเร็จ', 'ลบบัญชีไม่สำเร็จ!');
          }
        },
      },
    ]);
  };
  const onSetToUser = async () => {
    try {
      const res = await firestore()
        .collection(`users`)
        .doc(userData.key)
        .update({isAdmin: false});
      Alert.alert('สำเร็จ', 'ให้สิทธิเป็นผู้ใช้งานสำเร็จ');
    } catch (error) {
      Alert.alert('ไม่สำเร็จ', 'กรุณาลองใหม่อีกครั้ง!');
    }
  };
  return (
    <Background>
      <BtGoBack />
      <View style={styles.container}>
        <Text
          style={{
            textAlign: 'center',
            fontWeight: 'bold',
            fontSize: 20,
            marginBottom: 10,
          }}>
          ข้อมูลส่วนตัวผู้ใช้
        </Text>
        <CardBorder>
          <View style={styles.image}>
            <Image
              source={require('../../../../assets/person.png')}
              style={{width: 80, height: 80}}
            />
          </View>
          <View style={styles.textInCard}>
            <Text style={styles.textSubtitle}>ชื่อ-นามสกุล</Text>
            <View style={styles.cardText}>
              <Text style={styles.textValue}>
                {userData.f_name} {userData.l_name}
              </Text>
            </View>
          </View>
          <View style={styles.textInCard}>
            <Text style={styles.textSubtitle}>เลขบัตรประชาชน</Text>
            <View style={styles.cardText}>
              <Text style={styles.textValue}>{userData.cid}</Text>
            </View>
          </View>
          <View style={styles.textInCard}>
            <Text style={styles.textSubtitle}>อีเมล</Text>
            <View style={styles.cardText}>
              <Text style={styles.textValue}>{userData.email}</Text>
            </View>
          </View>
          <View style={styles.textInCard}>
            <Text style={styles.textSubtitle}>เบอร์โทรศัพท์</Text>
            <View style={styles.cardText}>
              <Text style={styles.textValue}>{userData.phone}</Text>
            </View>
          </View>
        </CardBorder>
        {statusChangePassword ? (
          <View>
            <CardBorder>
              <TextInput
                style={styles.input}
                onChangeText={setPasswordChang}
                value={passwordChang}
                placeholder="กรอกรหัสผ่านใหม่"
              />
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop: 5,
                  paddingHorizontal: 5,
                }}>
                <Button
                  style={{marginHorizontal: 10, backgroundColor: 'seagreen'}}
                  mode="contained"
                  title="บันทึก"
                  color={Colors.seagreen}
                  onPress={() => onChangePassword()}></Button>
                <View style={{paddingVertical: 5}}></View>
                <Text>|</Text>
                <Button
                  style={{marginHorizontal: 10, backgroundColor: 'seagreen'}}
                  mode="contained"
                  title="ยกเลิก"
                  color={Colors.dimgray}
                  onPress={() => setStatusChangePassword(false)}></Button>
              </View>
            </CardBorder>
          </View>
        ) : (
          <View>
            <View style={styles.rowCard}>
              <TouchableWithoutFeedback
                onPress={() => setStatusChangePassword(true)}>
                <View style={styles.box}>
                  <Image
                    source={require('../../../../assets/EditCard/resetpassword.png')}
                    style={{width: 70, height: 70}}
                  />
                  <Text style={{marginTop: 5, textAlign: 'center'}}>
                    เปลี่ยน {'\n'}รหัสผ่าน
                  </Text>
                </View>
              </TouchableWithoutFeedback>
              <View style={{paddingVertical: 1}}></View>
              {user.role == 'admin' ? (
                user.role == 'staff' ? (
                  <TouchableWithoutFeedback onPress={() => onSetToUser()}>
                    <View style={styles.box}>
                      <Image
                        source={require('../../../../assets/EditCard/switchuser.png')}
                        style={{width: 70, height: 70}}
                      />
                      <Text style={{marginTop: 5, textAlign: 'center'}}>
                        กำหนดสิทธิ์เป็นผู้ใช้ทั่วไป
                      </Text>
                    </View>
                  </TouchableWithoutFeedback>
                ) : (
                  <TouchableWithoutFeedback onPress={() => onSetToAdmin()}>
                    <View style={styles.box}>
                      <Image
                        source={require('../../../../assets/EditCard/key.png')}
                        style={{width: 70, height: 70}}
                      />
                      <Text style={{marginTop: 5, textAlign: 'center'}}>
                        กำหนดสิทธิ์เป็นเจ้าหน้าที่
                      </Text>
                    </View>
                  </TouchableWithoutFeedback>
                )
              ) : null}
              <TouchableWithoutFeedback
                onPress={() =>
                  navigation.navigate('selectYear', {
                    userData: userData,
                  })
                }>
                <View style={styles.box}>
                  <Image
                    source={require('../../../../assets/EditCard/resultuser.png')}
                    style={{width: 70, height: 70}}
                  />
                  <Text style={{marginTop: 5, textAlign: 'center'}}>
                    ดูผลตรวจสุขภาพ
                  </Text>
                </View>
              </TouchableWithoutFeedback>
            </View>
          </View>
        )}
        <View style={styles.rowCard}>
          <TouchableWithoutFeedback
            onPress={() =>
              navigation.navigate('editUser', {
                userData: userData,
              })
            }>
            <View style={styles.box}>
              <Image
                source={require('../../../../assets/EditCard/editprofile.png')}
                style={{width: 70, height: 70}}
              />
              <Text style={{marginTop: 5, textAlign: 'center'}}>
                แก้ไขข้อมูลส่วนตัว
              </Text>
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={() => onDelete()}>
            <View style={styles.box}>
              <Image
                source={require('../../../../assets/EditCard/delete.png')}
                style={{width: 70, height: 70}}
              />
              <Text style={{marginTop: 5, textAlign: 'center'}}>
                ลบข้อมูล{'\n'}ผู้ใช้งาน
              </Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </View>
    </Background>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 20,
    flexDirection: 'column',
    marginVertical: 10,
  },
  textInCard: {
    flexDirection: 'row',
    paddingVertical: 5,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  textSubtitle: {
    flex: 1,
  },
  cardText: {
    backgroundColor: Colors.white,
    flex: 2,
    padding: 5,
    borderRadius: 10,
  },
  textValue: {
    fontWeight: 'bold',
  },
  rowCard: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginVertical: 10,
  },
  box: {
    marginHorizontal: 10,
    marginEnd: 20,
    marginBottom: 5,
    padding: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: 90,
    backgroundColor: 'transparent',
  },
  image: {
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
});
