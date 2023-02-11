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
        try {
          const user = await auth().createUserWithEmailAndPassword(
            data.email,
            data.password,
          );
          console.log(user.user);
          const docRef = await firestore()
            .collection('users')
            .doc(user.user.uid)
            .set({
              f_name: data.f_name,
              l_name: data.l_name,
              email: data.email,
              password: data.password,
              cid: data.cid,
              birthday: date.toLocaleDateString(),
              phone: data.phone,
              isAdmin: false
            });
          reset({
            f_name: '',
            l_name: '',
            email: '',
            password: '',
            cid: '',
            phone:''
          });
          navigation.navigate('loading');
        } catch (error) {
          if (error.code === 'auth/email-already-in-use') {
            console.log('That email address is already in use!');
          }

          if (error.code === 'auth/invalid-email') {
            console.log('That email address is invalid!');
          }
          Alert.alert('ไม่สำเร็จ', `${error.code}`);
          console.error(error);
        }
      } catch (e) {
        setLoading(false);
        Alert.alert('ไม่สำเร็จ', `${e.message}`);
        console.error('Error adding document: ', e);
      }
    } else {
      setError('password_c', {type: 'custom', message: 'รหัสผ่านไม่ตรงกัน'});
    }
    setLoading(false);
  };
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
          <View style={{justifyContent: 'center', marginHorizontal: 10}}>
            <Text style={styles.text}>ลงทะเบียน | Register</Text>
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
            {errors.f_name && (
              <HelperText type="error">กรุณากรอกนามสกุล !</HelperText>
            )}
            </View>
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
                  keyboardType="numeric"
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
            <View style ={styles.BoxInput}>
            <Controller
              control={control}
              render={({field: {onChange, onBlur, value}}) => (
                <TextInput
                  style={styles.textinput}
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
            </View>
            <View style ={styles.BoxInput}>
            <Controller
              control={control}
              render={({field: {onChange, onBlur, value}}) => (
                <TextInput
                  style={styles.textinput}
                  label="รหัสผ่านอีกครั้ง(re-password)"
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
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                marginVertical: 10,
              }}>
              <Button
                style={{marginHorizontal: 10, 
                        backgroundColor: 'seagreen',
                        width: 210,}}
                mode="contained"
                onPress={handleSubmit(onSubmit)}>
                ลงทะเบียน
              </Button>
              <Text>|</Text>
              <Button
                style={{marginHorizontal: 10, backgroundColor: 'black'}}
                mode="contained"
                onPress={() => navigation.goBack()}>
                ยกเลิก
              </Button>
            </View>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
      </View>
    </Background>
  );
};

const styles = StyleSheet.create({
  text: {
    color: 'black',
    fontSize: 25,
    lineHeight: 84,
    marginTop: 10,
    textAlign: 'center',
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
    padding: 10,
    borderTopStartRadius: 30,
    borderTopEndRadius: 30,
    shadowColor: 'black',
  }
});

export default RegisterScreen;
