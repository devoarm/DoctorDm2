import * as React from 'react';
import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import Background from '../themes/Background';
import {TextInput, Button, HelperText} from 'react-native-paper';
import {useForm, Controller} from 'react-hook-form';
import Icon from 'react-native-vector-icons/FontAwesome';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {useSelector, useDispatch} from 'react-redux';
import {setUserSlice} from '../store/userSlice';
const RegisterGoogle = ({navigation}) => {
  const dispatch = useDispatch();

  const [user, setUser] = React.useState();
  // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);    
  }
  React.useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: {errors},
  } = useForm();
  const onSubmit = async data => {
    try {
      const googleRegister = firestore().collection('users').doc(user.uid).set({
        f_name: data.f_name,
        l_name: data.l_name,
        cid: data.cid,
      });
      dispatch(
        setUserSlice({
          f_name: data.f_name,
          l_name: data.l_name,
          cid: data.cid,
          
        }),
      );
      navigation.navigate('home');
    } catch (e) {
      console.error('Error adding document: ', e);
    }
  };
  return (
    <Background>
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

export default RegisterGoogle;
