import React, {useState, useEffect} from 'react';
import {View, Text} from 'react-native';
import auth from '@react-native-firebase/auth';
import HomeScreen from './Home';
import Login from '../auth/Login';
import {ActivityIndicator, MD2Colors} from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';
import {useSelector, useDispatch} from 'react-redux';
import {setUserSlice} from '../store/userSlice';
function Loading({navigation}) {
  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();
  const dispatch = useDispatch();
  // Handle user state changes
  async function onAuthStateChanged(user) {
    if (user) {
      const userDoc = await firestore().collection('users').doc(user.uid).get();
      if (userDoc) {
        // console.log(user);
        // console.log(userDoc.data());
        dispatch(
          setUserSlice({
            f_name: userDoc.data().f_name,
            l_name: userDoc.data().l_name,
            cid: userDoc.data().cid,
            email: user.email,
            uid: user.uid,
            photoURL: user.photoURL,
          }),
        );
      }
      setUser(user);
    }
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return null;

  if (!user) {
    return (
      <Login />
    );
  }

  return (
    <HomeScreen />
  );
}
export default Loading;
