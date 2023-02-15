import {StyleSheet, View, Pressable, ScrollView} from 'react-native';
import {Text} from 'react-native-paper';
import React from 'react';
import Background from '../../themes/BackGroundSession';
import BtGoBack from '../../components/BtGoBack';
import CardBorder from '../../components/CardBorder';
import DatePicker from 'react-native-date-picker';
import {ProgressDialog} from 'react-native-simple-dialogs';
import {
  TextInput,
  Button,
  HelperText,
  IconButton,
  Image,
} from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';
import Colors from '../../themes/Colors';
import moment from 'moment';
import {useSelector, useDispatch} from 'react-redux';
export default function AppointScreen({navigation}) {
  const [loading, setLoading] = React.useState(false);
  const [date, setDate] = React.useState(new Date());
  const [location, setLocation] = React.useState('');
  const [openPicker, setOpenPicker] = React.useState(false);
  const [time, setTime] = React.useState(new Date());
  const [openPickerTime, setOpenPickerTime] = React.useState(false);
  const positionReducer = useSelector(state => state.position);
  const handleSave = async () => {
    setLoading(true);
    const data = {
      date: moment(date).format('YYYY-MM-DD'),
      time: moment(date).format('HH:MM:DD'),
      namePosition: location,
      latitude: positionReducer.latitude,
      longitude: positionReducer.longitude,
    };
    // return console.log(data)
    try {
      const res = await firestore()
        .collection(`appoint`)
        .doc(moment(date).format('YYYY'))
        .set(data);
      navigation.goBack();
    } catch (error) {
      console.log(error.message)
      setLoading(false);
    }
    setLoading(false);
  };
  return (
    <Background>
      <ProgressDialog
        visible={loading}
        title="กำลังโหลด"
        message="กรุณารอสักครู่..."
      />
      <ScrollView>
        <BtGoBack />
        <Text
          style={{
            fontWeight: 'bold',
            textAlign: 'center',
            fontSize: 20,
            marginVertical: 30,
            marginBottom: 10,
          }}>
          จัดการข้อมูลกำหนดการ {'\n'}ตรวจสุขภาพประจำปี
        </Text>
        <View style={styles.container}>
          <CardBorder>
            <Pressable
              onPress={() => setOpenPicker(true)}
              style={{marginVertical: 10}}>
              <TextInput
                label="
                  กรุณาเลือกวัน
                "
                value={date.toLocaleDateString()}
                left={<TextInput.Icon icon="calendar-alt" />}
                editable={false}
                style={{backgroundColor: Colors.gainsboro}}
              />
            </Pressable>
            <DatePicker
              title="กรุณาเลือกวัน"
              modal
              mode="date"
              open={openPicker}
              date={date}
              onConfirm={date => {
                setOpenPicker(false);
                setDate(date);
                console.log(date.getDate());
              }}
              onCancel={() => {
                setOpenPicker(false);
              }}
            />
            <Pressable
              onPress={() => {
                setOpenPickerTime(true);
                console.log('click');
              }}
              style={{marginVertical: 5}}>
              <TextInput
                label="
                  กรุณาเลือกเวลา
                "
                value={date.toLocaleTimeString()}
                left={<TextInput.Icon icon="calendar-alt" />}
                editable={false}
                style={{backgroundColor: Colors.gainsboro}}
              />
            </Pressable>
            <DatePicker
              title="กรุณาเลือกเวลา"
              modal
              mode="time"
              open={openPickerTime}
              date={date}
              onConfirm={date => {
                setOpenPickerTime(false);
                setTime(date);
              }}
              onCancel={() => {
                setOpenPickerTime(false);
              }}
            />
            <TextInput
              label="
            กรุณาระบุสถานที่
                "
              style={{backgroundColor: Colors.gainsboro, marginVertical: 10}}
              onChangeText={setLocation}
              value={location}
            />

            <Pressable
              onPress={() => navigation.navigate('makerMap')}
              style={{marginVertical: 5}}>
              <TextInput
                label="
              ปักหมุดสถานที่
                "
                value={`${positionReducer.latitude},${positionReducer.longitude}`}
                left={
                  <TextInput.Icon
                    icon="map-marked-alt"
                    onPress={() => navigation.navigate('makerMap')}
                  />
                }
                editable={false}
                style={{backgroundColor: Colors.gainsboro}}
              />
            </Pressable>
          </CardBorder>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 10,
            }}>
            <Button
              style={{marginHorizontal: 10, backgroundColor: 'seagreen'}}
              mode="contained"
              onPress={() => {
                handleSave();
              }}>
              บันทึก
            </Button>
            <Button
              style={{marginHorizontal: 10, backgroundColor: 'dimgray'}}
              mode="contained"
              onPress={() => navigation.goBack()}>
              ย้อนกลับ
            </Button>
          </View>
        </View>
      </ScrollView>
    </Background>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
});
