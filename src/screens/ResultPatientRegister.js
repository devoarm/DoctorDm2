import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';
import SessionBg from '../themes/BackGroundSession';
import Icon from 'react-native-vector-icons/FontAwesome5';
import BtGoBack from '../components/BtGoBack';
import Colors from '../themes/Colors';
import {useSelector} from 'react-redux';
import {TextInput, Button, Avatar} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
const ResultPatientRegisterScreen = () => {
  const user = useSelector(state => state.user);
    const navigation = useNavigation()
  return (
    <SessionBg>
      <BtGoBack />
      <View style={styles.container}>
        <View style={styles.card}>
          <Text>คุณ</Text>
          <Text style={{fontWeight: 'bold', fontSize: 20, marginVertical: 10}}>
            {user.f_name} {user.l_name}
          </Text>
          <Text style={{textAlign: 'center'}}>
            ได้ลงทะเบียนตรวจสุขภาพประจำปี 2565
          </Text>
          <Text style={{textAlign: 'center'}}>เรียบร้อยแล้ว</Text>
          <Image
            size={80}
            source={require('../../assets/icon/success.png')}
            style={{margin: 10}}
          />
          <Text style={{textAlign: 'center'}}>
            กรุณาติดตามกำหนดการในการตรวจสุขภาพประจำปี
            ได้ผ่านการแจ้งเตือนของแอปพลิเคชั่น
            หรือฟังประกาศผ่านหอกระจายข่าวของชุมชน
          </Text>
        </View>

        <Button
          mode="contained"
          style={{backgroundColor: 'green'}}
          onPress={() => navigation.replace('home')}>
          กลับสู่หน้าหลัก
        </Button>
      </View>
    </SessionBg>
  );
};

export default ResultPatientRegisterScreen;

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
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.greenShade,
    borderRadius: 15,
    marginBottom:20
  },
  
});
