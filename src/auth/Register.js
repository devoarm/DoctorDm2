import * as React from 'react';
import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  ScrollView,
  KeyboardAvoidingView,
  Pressable,
  Alert,
} from 'react-native';
import Background from '../themes/Background';
import {TextInput, Button, HelperText, IconButton} from 'react-native-paper';
import {useForm, Controller} from 'react-hook-form';
import Icon from 'react-native-vector-icons/FontAwesome5';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import DatePicker from 'react-native-date-picker';
import {ProgressDialog} from 'react-native-simple-dialogs';

const RegisterScreen = ({navigation}) => {
  const [date, setDate] = React.useState(new Date());
  const [secureText, setsecureText] = React.useState(true);
  const [openPicker, setOpenPicker] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const {
    register,
    handleSubmit,
    watch,
    control,
    setError,
    reset,
    formState: {errors},
  } = useForm();
  const onSubmit = async data => {
    setLoading(true);
    if (data.password == data.password_c) {
      try {
        const docRef = await firestore().collection('users').add({
          f_name: data.f_name,
          l_name: data.l_name,
          email: data.email,
          password: data.password,
          cid: data.cid,
          birthday: date.toLocaleDateString(),
        });
        reset();
        setLoading(false);
        navigation.navigate('login');
      } catch (e) {
        setLoading(false);
        Alert.alert(
          "ไม่สำเร็จ",
          `${e.message}`,         
        );
        console.error('Error adding document: ', e);
      }
    } else {
      setError('password_c', {type: 'custom', message: 'รหัสผ่านไม่ตรงกัน'});
    }
  };
  return (
    <Background>
      <ProgressDialog
        visible={loading}
        title="กำลังโหลด"
        message="กรุณา, รอสักครู่..."
      />
      <ScrollView
        contentContainerStyle={{flexGrow: 1, justifyContent: 'center'}}>
        <KeyboardAvoidingView
          contentContainerStyle={{flexGrow: 1, justifyContent: 'center'}}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <View style={{justifyContent: 'center', marginHorizontal: 30}}>
            <Text style={styles.text}>ลงทะเบียน | Register</Text>
            <Controller
              control={control}
              render={({field: {onChange, onBlur, value}}) => (
                <TextInput
                  style={{marginVertical: 5}}
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
            <Controller
              control={control}
              render={({field: {onChange, onBlur, value}}) => (
                <TextInput
                  style={{marginVertical: 5}}
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
            {errors.f_name && (
              <HelperText type="error">กรุณากรอกนามสกุล !</HelperText>
            )}
            <Pressable onPress={() => setOpenPicker(true)}>
              <TextInput
                label="
                  กรุณาเลือกวันเกิด
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
            <Controller
              control={control}
              render={({field: {onChange, onBlur, value}}) => (
                <TextInput
                  style={{marginVertical: 5}}
                  label="รหัสบัตรประชาชน(username)"
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
                กรุณากรอกรหัสบัตรประชาชน(username) !
              </HelperText>
            )}
            <Controller
              control={control}
              render={({field: {onChange, onBlur, value}}) => (
                <TextInput
                  style={{marginVertical: 5}}
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
            <Controller
              control={control}
              render={({field: {onChange, onBlur, value}}) => (
                <TextInput
                  style={{marginVertical: 5}}
                  label="รหัสผ่าน(password)"
                  value={value}
                  onBlur={onBlur}
                  onChangeText={value => onChange(value)}
                  error={errors.password && true}
                  secureTextEntry={secureText}
                  right={
                    <TextInput.Icon
                      icon="eye"
                      onPress={() => {
                        setsecureText(!secureText);
                      }}
                    />
                  }
                />
              )}
              rules={{required: true}}
              name="password"
            />
            {errors.password && (
              <HelperText type="error">
                กรุณากรอกรหัสผ่าน(password) !
              </HelperText>
            )}
            <Controller
              control={control}
              render={({field: {onChange, onBlur, value}}) => (
                <TextInput
                  style={{marginVertical: 5}}
                  label="รหัสผ่าน(password)"
                  value={value}
                  onBlur={onBlur}
                  secureTextEntry={secureText}
                  onChangeText={value => onChange(value)}
                  error={errors.password_c && true}
                  right={
                    <TextInput.Icon
                      icon="eye"
                      onPress={() => {
                        setsecureText(!secureText);
                      }}
                    />
                  }
                />
              )}
              rules={{required: 'กรุณายืนยันรหัสผ่าน'}}
              name="password_c"
            />
            {errors.password_c && (
              <HelperText type="error">{errors.password_c.message}</HelperText>
            )}
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 30,
              }}>
              <Button
                style={{marginHorizontal: 10, backgroundColor: 'grey'}}
                mode="contained"
                onPress={handleSubmit(onSubmit)}>
                ลงทะเบียน
              </Button>
              <Text>|</Text>
              <Button
                style={{marginHorizontal: 10, backgroundColor: 'goldenrod'}}
                mode="contained"
                onPress={() => navigation.goBack()}>
                ยกเลิก
              </Button>
            </View>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </Background>
  );
};

const styles = StyleSheet.create({
  text: {
    color: 'black',
    fontSize: 25,
    lineHeight: 84,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default RegisterScreen;
