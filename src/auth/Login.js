import * as React from 'react';
import {
  GoogleSignin,
  GoogleSigninButton,
} from '@react-native-google-signin/google-signin';
import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  ScrollView,
  KeyboardAvoidingView,
  Alert,
  StackActions,
  Image,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import Background from '../themes/BackGroundSession';
import {TextInput, Button, HelperText} from 'react-native-paper';
import {useForm, Controller} from 'react-hook-form';
import {useNavigation} from '@react-navigation/native';
import {ProgressDialog} from 'react-native-simple-dialogs';
import {useSelector, useDispatch} from 'react-redux';
import {setUserSlice} from '../store/userSlice';
import Colors from '../themes/Colors';

GoogleSignin.configure({
  webClientId:
    '833899447588-jdrsimoomurqvvirl5bqubsu8prrb24s.apps.googleusercontent.com',
});

const Login = () => {
  const [loading, setLoading] = React.useState(false);
  const [secureText, setsecureText] = React.useState(true);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {
    register,
    handleSubmit,
    watch,
    control,
    setError,
    formState: {errors},
  } = useForm();
  const onSubmit = async data => {
    setLoading(true);
    firestore()
      .collection('users')
      .where('cid', '==', data.cid)
      .limit(1)
      .get()
      .then(querySnapshot => {
        if (querySnapshot.size > 0) {
          firestore()
            .collection('users')
            .where('password', '==', data.password)
            .limit(1)
            .get()
            .then(querySnapshotPw => {
              if (querySnapshotPw.size > 0) {
                querySnapshotPw.docs.forEach(doc => {
                  console.log(doc.data());
                  auth()
                    .signInWithEmailAndPassword(
                      doc.data().email,
                      doc.data().password,
                    )
                    .then(() => {
                      navigation.replace('loading');
                    });
                });
              } else {
                setError('password', {
                  type: 'custom',
                  message: 'รหัสผ่านไม่ถูกต้อง!',
                });
              }
            });
        } else {
          setError('cid', {type: 'custom', message: 'เลขบัตรไม่ถูกต้อง!'});
        }
      });
    setLoading(false);
  };
  const handleGoogleSingin = async () => {
    setLoading(true);
    try {
      await GoogleSignin.hasPlayServices();
      const {idToken} = await GoogleSignin.signIn();
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      const user = await auth().signInWithCredential(googleCredential);
      const userDocument = await firestore()
        .collection('users')
        .doc(user.user.uid)
        .get();
      if (userDocument.data()) {
        console.log('Has Data');
        navigation.navigate('home');
      } else {
        console.log('No Data');
        navigation.navigate('registerGoogle');
      }
    } catch (error) {
      console.log(error.message);
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
          <View style={styles.image}>
          <Image 
            source={require('../../assets/banner.png')}
            style={{width: 337,height: 177}}
          /></View>
        <View style={styles.frame}>
        <View
          style={{
            marginHorizontal: 50
          }}>
          <Text style={styles.text}>เข้าสู่ระบบ | Login</Text>
          <View>
            <Controller
              control={control}
              render={({field: {onChange, onBlur, value}}) => (
                <View style={styles.BoxInput}>
                <TextInput
                  style={styles.textinput}
                  label="เลขประจำตัวประชาชน (user)"
                  value={value}
                  onBlur={onBlur}
                  onChangeText={value => onChange(value)}
                  error={errors.cid && true}
                /></View>
              )}
              name="cid"
              rules={{required: 'กรุณากรอกเลขประจำตัวประชาชน!'}}
            />
            {errors.cid && (
              <HelperText type="error">{errors.cid.message}</HelperText>
            )}
          </View>
          <Controller
            control={control}
            render={({field: {onChange, onBlur, value}}) => (
              <View style={styles.BoxInput}>
              <TextInput
                style={styles.textinput}
                label="รหัสผ่าน (password)"
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
              /></View>
            )}
            name="password"
            rules={{required: 'กรุณากรอกรหัสผ่าน !'}}
          />

          {errors.password && (
            <HelperText type="error">{errors.password.message}</HelperText>
          )}
          <View
            style={{
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Button
              style={{marginHorizontal: 5, 
                      backgroundColor: 'seagreen',
                      width: 330,
                      height: 45,
                      marginVertical: 5,
                      borderRadius:30,
                      }}
              mode="contained"
              onPress={handleSubmit(onSubmit)}>
              เข้าสู่ระบบ
            </Button>
            <Button
              style={{marginHorizontal: 5, 
                      backgroundColor: 'black',
                      width: 330,
                      height: 45,
                      marginVertical: 5,
                      borderRadius:30,}}
              mode="contained"
              onPress={() => navigation.navigate('register')}>
              ลงทะเบียน
            </Button>
          </View>
          <Text style={{textAlign: 'center', marginVertical: 10}}>หรือ</Text>
          <Button
              style={{marginHorizontal: 5, 
                      backgroundColor: Colors.red,
                      width: 330,
                      height: 45,
                      marginVertical: 5,
                      borderRadius:30,
                    }}
              mode="contained"
              onPress={handleGoogleSingin}>
                <Image source={require('../../assets/icon/google.png')}
                        style={{width: 16,height: 16}}/>
              <Text style={{textAlign: 'center'}}>ลงทะเบียนด้วย Google</Text>
            </Button>
        </View>
        </View>
    </Background>
  );
};
const styles = StyleSheet.create({
  text: {
    color: 'black',
    fontSize: 25,
    lineHeight: 84,
    textAlign: 'center',
  },
  image:{
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 20,
  },
  BoxInput: {
    height: 55,
    backgroundColor: 'white',
    borderRadius: 30,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  textinput: {
    flex: 1,
    backgroundColor: 'transparent',
    marginHorizontal: 30,
  },
  frame:{
    height: 550,
    marginHorizontal: 5,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: Colors.whiteSmoke,
    padding: 10,
    borderTopStartRadius: 30,
    borderTopEndRadius: 30,
    shadowColor: 'black',
    alignItems: 'center',
  }
});
export default Login;
