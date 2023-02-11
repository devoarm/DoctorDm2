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
          <Text>การตรวจโรคเบาหวาน</Text>
          <Text>1. พักผ่อนให้เพียงพอ 
          เพื่อให้ระดับน้ำตาลในเลือดอยู่ในภาวะปกติ
          </Text>
          <Text>2. ควรงดอาหาร และเครื่องดื่ม 6 – 8 ชั่วโมง 
          ก่อนถึงเวลานัดตรวจ
          </Text>
          <Text></Text>
          <Text>การวัดความดันโลหิต</Text>
          <Text>1. ไม่ดื่มชา-กาแฟ
          และไม่สูบบุหรี่ก่อนทำการวัด 30 นาที
          </Text>
          <Text>2. นั่งบนเก้าอี้หลังพิงพนักและหลังตรง</Text>
          <Text>3. งดการพูดคุยระหว่างวัดความดันโลหิต</Text>
          <Text>4. วางแขนไว้บนโต๊ะให้ปลอกแขน Arm cuff 
          อยู่ระดับเดียวกับหัวใจ
          </Text>
          <Text>5. ไม่เกร็งแขนและไม่กำมือขณะวัดความดันโลหิต</Text>
          <Text>6. เท้าทั้งสองวางราบกับพื้นไม่ไขว่ห้าง</Text>
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
