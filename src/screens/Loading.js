import React, {useState, useEffect} from 'react';
import {View, Text} from 'react-native';
import auth from '@react-native-firebase/auth';
import HomeScreen from './Home';
import Login from '../auth/Login';
import {ActivityIndicator, MD2Colors} from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';
import {useSelector, useDispatch} from 'react-redux';
import {setUserSlice} from '../store/userSlice';
import HomeStaffScreen from './staff/HomeStaff';
function Loading({navigation}) {
  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [role, setRole] = useState('');
  const [user, setUser] = useState();
  const dispatch = useDispatch();
  const authReducer = useSelector(state => state.user);
  // Handle user state changes
  async function onAuthStateChanged(user) {
    // return await auth().signOut();
    if (user) {
      const userDoc = await firestore().collection('users').doc(user.uid).get();
      if (userDoc.data()) {
        // console.log(user);

        setRole(userDoc.data().role);
        dispatch(
          setUserSlice({
            f_name: userDoc.data().f_name,
            l_name: userDoc.data().l_name,
            phone: userDoc.data().phone,
            cid: userDoc.data().cid,
            role: userDoc.data().role,
            email: user.email,
            uid: user.uid,
            photoURL: user.photoURL,
          }),
        );
      } else {
        navigation.replace('registerGoogle');
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
    return <Login />;
  }
  if (role == 'admin' || role == 'staff') {
    return <HomeStaffScreen />;
  } else if (role == 'user') {
    return <HomeScreen />;
  } else {
    return <Login />;
  }
}
export default Loading;
