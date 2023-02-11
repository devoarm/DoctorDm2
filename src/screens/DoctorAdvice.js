import {StyleSheet, View, Image, Button,ScrollView} from 'react-native';
import React from 'react';
import DoctorAdviceBg from '../themes/BackgroundDoctorAdvice';
import SessionBg from '../themes/BackGroundSession';
import Icon from 'react-native-vector-icons/FontAwesome5';
import BtGoBack from '../components/BtGoBack';
import Colors from '../themes/Colors';
import {useSelector} from 'react-redux';
import {TextInput, Avatar, Text, ToggleButton} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import CardWalk from '../components/CardWalk';
import CardFood from '../components/CardFood';
const DoctorAdvice = () => {
  const user = useSelector(state => state.user);
  const navigation = useNavigation();
  return (
    <DoctorAdviceBg>
      <BtGoBack />
      <ScrollView vertical={true}>
      <View style={styles.container}>
        <View style={styles.cardHeader}>
          <Text style={styles.textHeader}>คำแนะนำด้านการดูแลสุขภาพของ</Text>
          <View style={{flexDirection: 'row'}}>
            <Text style={{fontSize: 16}}>คุณ </Text>
            <Text style={{fontWeight: 'bold', fontSize: 16}}>
              {user.f_name} {user.l_name}
            </Text>
          </View>
        </View>
        {/* <View style={styles.underHeader}>
          <View style={{flex: 3}}>
            <Text>
              เราจะส่งแจ้งเตือนการดูแลสุขภาพให้คุณทุกวัน กรุณา เปิดแจ้งเตือน
              และปฏิบัติตามคำแนะนำ เพื่อสุขภาพที่ดียิ่งขึ้น
            </Text>
          </View>
          <View style={{flex: 1, alignItems: 'center'}}>
            <Icon name="bell" size={30} />
          </View>
        </View> */}
        <View style={styles.cardAdvice}>
          <View style={{flex: 2}}>
            <Image source={require('../../assets/diet.png')} 
                    style ={{width:120,height:115}}/>
          </View>
          <View style={{flex: 2}}>
            <Text>งด อาหารรสจัด อาหารที่มีไขมันสูง อาหารหมักดอง</Text>
            <Text></Text>
            <Text>งด สูบบุหรี่และดื่ม เครื่องดื่มแอลกอฮอล</Text>
          </View>
        </View>
        <Text>เมนูที่แนะนำ</Text>
        <View style={styles.cardFood}>
          <View style={{flex: 2}}>
            <Image source={require(`../../assets/food/food1.png`)} />
          </View>
          <View style={{flex: 1}}>
            <Text>โจ๊กหมูสับ</Text>
          </View></View>
          <View style={styles.cardFood}>
          <View style={{flex: 2}}>
            <Image source={require(`../../assets/food/food2.png`)} />
          </View>
          <View style={{flex: 1}}>
            <Text>ฝรั่ง 1 จาน หรือผลไม้หวานน้อย</Text>
          </View></View>
          <View style={styles.cardFood}>
          <View style={{flex: 2}}>
            <Image source={require(`../../assets/food/food3.png`)} />
          </View>
          <View style={{flex: 1}}>
            <Text>ส้มตำไทย 1 จาน</Text>
          </View></View>
          <View style={styles.cardFood}>
          <View style={{flex: 2}}>
            <Image source={require(`../../assets/food/food2.png`)} />
          </View>
          <View style={{flex: 1}}>
            <Text>ชาไม่หวาน 1 แก้ว</Text>
          </View></View>
          <View style={styles.cardFood}>
          <View style={{flex: 2}}>
            <Image source={require(`../../assets/food/food4.png`)} />
          </View>
          <View style={{flex: 1}}>
            <Text>ข้าว 1 ทัพพี ปลาทูทอด 1 ตัว น้ำพริก+ผักสดและผักลวก 1 จาน</Text>
          </View></View>
        <Text>การออกกำลังกาย</Text>
        <ScrollView horizontal={true}>
          <CardWalk
            lable="เดินเร็ว 30 นาที"
            image={require(`../../assets/walk/walking1.png`)}
          />
          <CardWalk
            lable="วิ่งเหยาะๆ 30 นาที"
            image={require(`../../assets/walk/walking2.png`)}
          />
          <CardWalk
            lable="วิ่งเหยาะๆ 30 นาที"
            image={require(`../../assets/walk/walking3.png`)}
          />
          <CardWalk
            lable="เดินเล่นกับสัตว์เลี้ยง 30 นาที"
            image={require(`../../assets/walk/walking4.png`)}
          />
        </ScrollView>
      </View></ScrollView>
    </DoctorAdviceBg>
  );
};

export default DoctorAdvice;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 20,
    flexDirection: 'column',
    
  },
  cardHeader: {
    padding: 25,
    justifyContent: 'flex-start',
    backgroundColor: Colors.gray,
    borderRadius: 15,
    marginTop: 30,
    opacity: 0.8,   
  },
  underHeader: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardAdvice: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.grayGreen,
    padding: 20,
    borderRadius: 20,
    marginVertical: 10,
    flexDirection: 'row',
  },
  cardFood: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.white,
    padding: 20,
    borderRadius: 20,
    margin: 5,
    flexDirection: 'row',
    marginHorizontal: 10,
  },
  textHeader: {
    fontSize: 16,
  },
});
