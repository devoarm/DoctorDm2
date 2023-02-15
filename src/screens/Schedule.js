import {StyleSheet, View, Image, Button} from 'react-native';
import React, {useEffect, useState} from 'react';
import ScheduleBg from '../themes/BackgroundSchedule';
import SessionBg from '../themes/BackGroundSession';
import Icon from 'react-native-vector-icons/FontAwesome5';
import BtGoBack from '../components/BtGoBack';
import Colors from '../themes/Colors';
import {useSelector} from 'react-redux';
import {TextInput, Avatar, Text, ToggleButton} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import moment from 'moment';
const ScheduleScreen = () => {
  const user = useSelector(state => state.user);
  const [appoint, setAppoint] = useState({});
  const navigation = useNavigation();
  const fetchAppoint = async () => {
    try {
      const detailAppoint = await firestore()
        .collection('appoint')
        .doc(moment().format('YYYY'))
        .get();
      console.log(detailAppoint.data());
      setAppoint({
        date: detailAppoint.data().date,
        latitude: detailAppoint.data().latitude,
        longitude: detailAppoint.data().longitude,
        namePosition: detailAppoint.data().namePosition,
        time: detailAppoint.data().time,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    fetchAppoint();
  }, []);

  return (
    <ScheduleBg>
      <BtGoBack />
      <View style={styles.container}>
        <Text style={{fontWeight: 'bold', fontSize: 17}}>กำหนดการ</Text>
        <Text style={{fontSize: 17}}>ตรวจสุขภาพประจำปี 2565</Text>
        <View style={styles.card}>
          <Text>
            โรงพยาบาลส่งเสริมสุขภาพตำบล จะทำการตรวจสุขภาพประจำปี
            โรคเบาหวานและความดันโลหิตสูง
          </Text>
          <View style={{marginVertical: 15}}>
            <View style={{flexDirection: 'row'}}>
              <Text style={{fontWeight: 'bold'}}>วันที่</Text>
              <Text>{` : ${moment(appoint.date).format('DD-MM-YYYY')}`}</Text>
            </View>
            <View style={{flexDirection: 'row'}}>
              <Text style={{fontWeight: 'bold'}}>เวลา</Text>
              <Text> {` : ${appoint.time}`}</Text>
            </View>
            <View style={{flexDirection: 'row'}}>
              <Text style={{fontWeight: 'bold'}}>สถานที่</Text>
              <Text>{` : ${appoint.namePosition}`}</Text>
            </View>
          </View>
          <Text>
            ขอให้ผู้เข้ารับการตรวจสุขภาพทุกท่านปฎิบัติตาม
            ข้อควรปฏิบัติและคำแนะนำก่อนเข้ารับการตรวจ อย่างเคร่งครัด
          </Text>
          <View style={{marginTop: 20}}>
            <Text
              style={{fontStyle: 'italic', marginBottom: 10}}
              onPress={() =>
                navigation.navigate('mapHealPosition', {
                  position: {
                    latitude: appoint.latitude,
                    longitude: appoint.longitude,
                  },
                })
              }>
              กดที่นี่ เพื่อดูแผนที่
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: 20,
              marginTop: 5,
            }}>
            <View style={{flex: 1}}>
              <Button
                title="ข้อควรปฏิบัติและคำแนะนำก่อนการตรวจสุขภาพ "
                color="seagreen"
                onPress={() => navigation.navigate('adviceSchedule')}
              />
            </View>
          </View>
        </View>
      </View>
    </ScheduleBg>
  );
};

export default ScheduleScreen;

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
    backgroundColor: Colors.gray,
    borderRadius: 15,
    marginTop: 10,
    marginBottom: 20,
  },
});
