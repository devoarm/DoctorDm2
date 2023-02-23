import {
  StyleSheet,
  View,
  Image,
  TextInput,
  ScrollView,
  Alert,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import ResultHealthCheckBg from '../themes/BackgroundResultHealthCheck';
import Icon from 'react-native-vector-icons/FontAwesome5';
import BtGoBack from '../components/BtGoBack';
import Colors from '../themes/Colors';
import {useSelector} from 'react-redux';
import {Button, Avatar, Text, Divider, HelperText} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import CardBorder from '../components/CardBorder';
import InputHealtCheck from '../components/InputHealtCheck';
import {useForm, Controller} from 'react-hook-form';
import firestore from '@react-native-firebase/firestore';
import {ProgressDialog} from 'react-native-simple-dialogs';
import moment from 'moment';
import ChartResultHealt from '../components/ChartResultHealt';
import CircleColor from '../components/CircleColor';
const ResultHealtCheckScreen = () => {
  const user = useSelector(state => state.user);
  const navigation = useNavigation();
  const [healtCheck, setHealtCheck] = useState([]);
  const [bloodSugar, setBloodSugar] = useState(0);
  const [sumValue, setSumValue] = useState(100);
  const [upperPressure, setUpperPressure] = useState(0);
  const [lowerPressure, setLowerPressure] = useState(0);
  const [loading, setLoading] = useState(false);
  const fetchHealt = async () => {
    try {
      var dateHeal = [];
      const query = await firestore()
        .collection('users')
        .doc(user.uid)
        .collection('healt_check')
        .doc(moment().format('YYYY'))
        .collection('healt_check_date')
        .get();
      query.forEach(documentSnapshot => {
        const fB = parseInt(documentSnapshot.data().bloodSugar);
        const fU = parseInt(documentSnapshot.data().upperPressure);
        const fL = parseInt(documentSnapshot.data().lowerPressure);
        const sum = fB + fU + fL;
        dateHeal.push({
          bloodSugar: fB,
          sumValue: sum,
          upperPressure: fU,
          lowerPressure: fL,
          date: documentSnapshot.id,
        });
        console.log(dateHeal);
      });
      setHealtCheck(dateHeal);
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    fetchHealt();
  }, []);

  return (
    <ResultHealthCheckBg>
      <ProgressDialog
        visible={loading}
        title="กำลังโหลด"
        message="กรุณารอสักครู่..."
      />
      <BtGoBack />
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.cardHeader}>
            <Text>ภาวะสุขภาพของ คุณ </Text>
            <Text style={{fontWeight: 'bold'}}>
              {user.f_name} {user.l_name}
            </Text>
          </View>
          {healtCheck.length > 0 ? (
            healtCheck.map((item, index) => (
              <View
                key={index}
                style={{
                  backgroundColor: Colors.greenShade,
                  flexDirection: 'column',
                  marginVertical: 20,
                }}>
                <Text
                  style={{
                    textAlign: 'center',
                    fontWeight: 'bold',
                    fontSize: 20,
                  }}>
                  ผลตรวจของ วันที่ : {item.date}
                </Text>
                <ChartResultHealt
                  bloodSugar={item.bloodSugar}
                  upperPressure={item.upperPressure}
                  lowerPressure={item.lowerPressure}
                  sum={item.sumValue}
                />

                <CardBorder>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignContent: 'center',
                      justifyContent: 'center',
                    }}>
                    <CircleColor color={Colors.bloodSugar} />
                    <Text>ระดับน้ำตาลในเลือด</Text>
                    <CircleColor color={Colors.upperPressure} />
                    <Text>ค่าบน</Text>
                    <CircleColor color={Colors.lowerPressure} />
                    <Text>ค่าล่าง</Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-around',
                      flex: 1,
                      margin: 10,
                    }}>
                    <View
                      style={{
                        flexDirection: 'column',
                      }}>
                      <Text style={{textAlign: 'center', fontSize: 25}}>
                        {item.bloodSugar}
                      </Text>
                      <Text style={{textAlign: 'center'}}>มิลลิกรัม</Text>
                    </View>
                    <View style={styles.verticleLine}></View>
                    <View style={{flexDirection: 'column'}}>
                      <Text style={{textAlign: 'center'}}>ความดันโลหิต</Text>
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-around',
                          alignItems: 'center',
                        }}>
                        <Text style={{textAlign: 'center', fontSize: 25}}>
                          {item.upperPressure}
                        </Text>
                        <View style={styles.subVerticleLine}></View>
                        <Text style={{textAlign: 'center', fontSize: 25}}>
                          {item.lowerPressure}
                        </Text>
                      </View>
                      <Text style={{textAlign: 'center'}}>มิลลิเมตรปรอท</Text>
                    </View>
                  </View>
                </CardBorder>

                <View style={styles.cardStatus}>
                  <Text>ภาวะสุขภาพ</Text>
                  <Text style={{textAlign: 'center', fontSize: 25}}>
                    {item.bloodSugar < 100 &&
                    item.upperPressure < 120 &&
                    item.lowerPressure < 80
                      ? 'คุณอยู่ในกลุ่มปกติ'
                      : item.bloodSugar <= 125 &&
                        item.upperPressure <= 139 &&
                        item.lowerPressure <= 89
                      ? 'คุณอยู่ในกลุ่มเสี่ยง'
                      : item.bloodSugar <= 199 &&
                        item.upperPressure <= 179 &&
                        item.lowerPressure <= 109
                      ? 'คุณอยู่ในกลุ่มเป็นโรค'
                      : item.bloodSugar > 200 &&
                        item.upperPressure > 180 &&
                        item.lowerPressure > 110
                      ? 'คุณอยู่ในกลุ่มอันตราย'
                      : ''}
                  </Text>
                </View>
                <Button
                  mode="contained"
                  style={{
                    backgroundColor: 'seagreen',
                    marginVertical: 20,
                    alignSelf: 'center',
                  }}
                  onPress={() => {
                    navigation.navigate('adviceVisit');
                  }}>
                  คำแนะนำการดูแลสุขภาพ
                </Button>
              </View>
            ))
          ) : (
            <Text>คุณยังไม่มีผลตรวจ</Text>
          )}
          <View style={styles.cardStatus}>
            <Text style={{textAlign: 'left', fontSize: 14}}>ข้อชี้แนะ</Text>
            <Text style={{textAlign: 'left', fontSize: 14, margin: 5}}>
              แอปพลิเคชันนี้ไม่ใช่เครื่องมือในการวินิจฉัยโรค
              เป็นเพียงการประเมินสุขภาพเบื้องต้นเท่านั้น
              ไม่สามารถแทนที่คำแนะนำของบุคลากรทางการแพทย์ได้
              ผู้ใช้ควรขอคำปรึกษาเพิ่มเติมจากผู้เชี่ยวชาญหรือบุคลากรทางการแพทย์อยู่เสมอ
              เพื่อการดูแลรักษาสุขภาพที่ถูกต้อง
            </Text>
          </View>
        </View>
      </ScrollView>
    </ResultHealthCheckBg>
  );
};

export default ResultHealtCheckScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  cardHeader: {
    marginTop: 30,
    padding: 25,
    alignItems: 'center',
    backgroundColor: Colors.gray,
    borderRadius: 15,
    flexDirection: 'row',
    opacity: 0.8,
  },
  titleCard: {
    backgroundColor: 'transparent',
    padding: 10,
    borderRadius: 30,
    marginHorizontal: 50,
    textAlign: 'center',
  },
  verticleLine: {
    height: 50,
    width: 1,
    backgroundColor: Colors.black,
  },
  subVerticleLine: {
    height: 20,
    width: 2,
    backgroundColor: Colors.black,
    marginHorizontal: 5,
  },
  cardStatus: {
    width: '100%',
    backgroundColor: Colors.white,
    padding: 15,
    borderRadius: 15,
    marginVertical: 5,
    alignSelf: 'center',
  },
});
