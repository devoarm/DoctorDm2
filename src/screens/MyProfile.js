import {
  StyleSheet,
  View,
  KeyboardAvoidingView,
  ScrollView,
  Pressable,
  Image,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Text, TextInput, HelperText, Button} from 'react-native-paper';
import Background from '../themes/Background';
import BtGoBack from '../components/BtGoBack';
import CardBorder from '../components/CardBorder';
import {useSelector} from 'react-redux';
import {useForm, Controller} from 'react-hook-form';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import DatePicker from 'react-native-date-picker';
import {ProgressDialog} from 'react-native-simple-dialogs';
export default function MyProfile({navigation}) {
  const [date, setDate] = React.useState(new Date());
  const [secureText, setsecureText] = React.useState(true);
  const user = useSelector(state => state.user);
  const [openPicker, setOpenPicker] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const {
    register,
    handleSubmit,
    watch,
    control,
    setError,
    setValue,
    reset,
    formState: {errors},
  } = useForm();
  const fetchProfile = async () => {
    const userDocument = await firestore()
      .collection('users')
      .doc(user.uid)
      .get();
    setValue('cid', userDocument.data().cid);
    setValue('birthday', userDocument.data().birthday);
    setValue('email', userDocument.data().email);
    setValue('f_name', userDocument.data().f_name);
    setValue('l_name', userDocument.data().l_name);
    setValue('phone', userDocument.data().phone);
  };
  const onSubmit = async data => {
    // return console.log(data)
    setLoading(true);
    const res = await firestore().collection(`users`).doc(user.uid).update({
      cid: data.cid,
      birthday: date.toLocaleDateString(),
      email: data.email,
      f_name: data.f_name,
      l_name: data.l_name,
      phone: data.phone,
    });
    setLoading(false);
  };
  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <Background>
      <ProgressDialog
        visible={loading}
        title="กำลังโหลด"
        message="กรุณา, รอสักครู่..."
      />  
      <View style={styles.frame}>
      <ScrollView
        contentContainerStyle={{flexGrow: 1, justifyContent: 'center'}}>
        <KeyboardAvoidingView
          contentContainerStyle={{flexGrow: 1, justifyContent: 'center'}}
          behavior={'padding'}>
          <View style={{justifyContent: 'center', marginHorizontal: 30, marginBottom: 5}}>
            <Text style={{fontSize: 17, textAlign: 'center',marginBottom: 10}}>แก้ไขข้อมูลส่วนตัว</Text>
            <View style ={styles.BoxInput}>
            <Controller
              control={control}
              render={({field: {onChange, onBlur, value}}) => (
                <TextInput
                  style={styles.textinput}
                  label="ชื่อ"
                  value={value}
                  onBlur={onBlur}
                  onChangeText={value => onChange(value)}
                  error={errors.f_name && true}
                />
              )}
              name="f_name"
              rules={{required: true}}
            />
            {errors.f_name && (
              <HelperText type="error">กรุณากรอกชื่อ !</HelperText>
            )}
            </View>
            <View style ={styles.BoxInput}>
            <Controller
              control={control}
              render={({field: {onChange, onBlur, value}}) => (
                <TextInput
                  style={styles.textinput}
                  label="นามสกุล"
                  value={value}
                  onBlur={onBlur}
                  onChangeText={value => onChange(value)}
                  error={errors.l_name && true}
                />
              )}
              name="l_name"
              rules={{required: true}}
            />
            </View>
            {errors.f_name && (
              <HelperText type="error">กรุณากรอกนามสกุล !</HelperText>
            )}
            <View style ={styles.BoxInput}>
            <Controller
              control={control}
              render={({field: {onChange, onBlur, value}}) => (
                <TextInput
                  style={styles.textinput}
                  label="เบอร์โทรศัพท์"
                  value={value}
                  keyboardType="numeric"
                  onBlur={onBlur}
                  onChangeText={value => onChange(value)}
                  error={errors.phone && true}
                />
              )}
              name="phone"
              rules={{required: true}}
            />
            {errors.phone && (
              <HelperText type="error">กรุณากรอกเบอร์โทรศัพท์ !</HelperText>
            )}
            </View>
            <View style ={styles.BoxInput}>
            <Pressable onPress={() => setOpenPicker(true)}>
              <TextInput
                style={styles.textinput}
                label="
                  วันเกิด
                "
                value={date.toLocaleDateString()}
                left={<TextInput.Icon icon="calendar-alt" />}
                editable={false}
              />
            </Pressable>
            <DatePicker
              title="กรุณาเลือกวันเกิด"
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
            </View>
            <View style ={styles.BoxInput}>
            <Controller
              control={control}
              render={({field: {onChange, onBlur, value}}) => (
                <TextInput
                style={styles.textinput}
                  label="เลขประจำตัวประชาชน(username)"
                  value={value}
                  onBlur={onBlur}
                  onChangeText={value => onChange(value)}
                  error={errors.cid && true}
                />
              )}
              name="cid"
              rules={{required: true}}
            />
            {errors.cid && (
              <HelperText type="error">
                กรุณากรอกเลขประจำตัวประชาชน(username) !
              </HelperText>
            )}
            </View>
            <View style ={styles.BoxInput}>
            <Controller
              control={control}
              render={({field: {onChange, onBlur, value}}) => (
                <TextInput
                  style={styles.textinput}
                  label="อีเมล(Email)"
                  value={value}
                  onBlur={onBlur}
                  onChangeText={value => onChange(value)}
                  error={errors.email && true}
                />
              )}
              name="email"
              rules={{required: true}}
            />
            {errors.email && (
              <HelperText type="error">กรุณากรอกอีเมล(Email) !</HelperText>
            )}
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 10,
              }}>
              <Button
                style={{width: 180,marginHorizontal: 10, backgroundColor: 'seagreen'}}
                mode="contained"
                onPress={handleSubmit(onSubmit)}>
                อัพเดท
              </Button>
              <Text>|</Text>
              <Button
                style={{marginHorizontal: 10, backgroundColor: 'black'}}
                mode="contained"
                onPress={() => navigation.goBack()}>
                ย้อนกลับ
              </Button>
            </View>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
      </View>   
    </Background>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 20,
    flexDirection: 'column',
  },
  BoxInput: {
    height: 55,
    backgroundColor: 'white',
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    borderColor: 'black',
    borderWidth: 1
  },
  textinput: {
    flex: 1,
    backgroundColor: 'transparent',
    marginHorizontal: 10,
  },
  frame:{
    height: 620,
    marginHorizontal: 5,
    marginTop: 95,
    justifyContent: 'flex-start',
    backgroundColor: Colors.whiteSmoke,
    borderTopStartRadius: 30,
    borderTopEndRadius: 30,
    shadowColor: 'black',
  },
});
