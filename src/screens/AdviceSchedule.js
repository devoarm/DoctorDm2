import {StyleSheet, View, Image, Button} from 'react-native';
import React from 'react';
import BackGround1 from '../themes/Background';
import SessionBg from '../themes/BackGroundSession';
import Icon from 'react-native-vector-icons/FontAwesome5';
import BtGoBack from '../components/BtGoBack';
import Colors from '../themes/Colors';
import {useSelector} from 'react-redux';
import {TextInput, Avatar, Text, ToggleButton} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
const AdviceScheduleScreen = () => {
  const user = useSelector(state => state.user);
  const navigation = useNavigation();
  return (
    <BackGround1>
      <BtGoBack />
      <View style={styles.container}>
        <Text style={{fontWeight: 'bold', fontSize: 17, textAlign: 'center'}}>
          ข้อควรปฏิบัติและคำแนะนำ {'\n'}ก่อนการตรวจสุขภาพ
        </Text>

        <View style={styles.card}>
          <Text>1.พักผ่อนให้เพียงพอ อย่างน้อย 8-10 ชั่วโมง</Text>
          <Text>2.งดอาหารเป็นระยะเวลา 8-10 ชั่วโมง สามารถจิบน้ำเปล่าได้</Text>
          <Text>
            3.สามารถรับประทานยาประจำตัวได้
            และควรแจ้งเจ้าหน้าที่ก่อนเข้ารับการตรวจ
          </Text>
          <Text>4.หากมีโรคประจำตัว กรุณานำเอกสารมาด้วย</Text>
          <Text>5.งดดื่มแอลกอฮอล์ และสูบบุหรี่</Text>
          <Text>6.สวมใส่เสื้อผ้าที่สะดวกสบายเหมาะแก่การ ตรวจสุขภาพ</Text>
          <View style={{marginTop: 20}}>
            <Text style={{textAlign: 'center'}}>
              กรุณาปฏิบัติตามคำแนะนำอย่างเคร่งครัด
              เพื่อผลการตรวจสุขภาพที่ถูกต้องแม่นยำ
            </Text>
          </View>
        </View>
      </View>
    </BackGround1>
  );
};

export default AdviceScheduleScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 40,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  card: {
    padding: 20,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    backgroundColor: Colors.greenShade,
    borderRadius: 15,
    marginTop: 10,
    marginBottom: 20,
  },
});
