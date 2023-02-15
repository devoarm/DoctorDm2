import {StyleSheet, Text, View, Button} from 'react-native';
import React from 'react';
import MapView from 'react-native-maps';
import {Marker} from 'react-native-maps';
import {useSelector, useDispatch} from 'react-redux';
import {enableLatestRenderer} from 'react-native-maps';
import BtGoBack from '../../components/BtGoBack';
import {setPositionSlice} from '../../store/positionSlice';
enableLatestRenderer();

const MakerMap = ({navigation}) => {
  const positionReducer = useSelector(state => state.position);
  const dispatch = useDispatch();
  const [positionMake, setPositionMake] = React.useState({
    latitude: positionReducer.latitude,
    latitudeDelta: 0.1,
    longitude: positionReducer.longitude,
    longitudeDelta: 0.1,
  });
  return (
    <View style={{flex: 1}}>
      <MapView
        style={styles.map}
        onRegionChange={e => {        
          dispatch(
            setPositionSlice({
              latitude: e.latitude,
              longitude: e.longitude,
            }),
          );
          setPositionMake(e);
          
        }}
        initialRegion={positionMake}>
        <Marker coordinate={positionMake} />
      </MapView>
      <View
        style={{
          position: 'absolute', //use absolute position to show button on top of the map
          top: '90%', //for center align
          alignSelf: 'center', //for align to right
        }}>
        <Button title="ยืนยัน" onPress={() => navigation.goBack()} />
      </View>
      <View
        style={{
          position: 'absolute', //use absolute position to show button on top of the map
          top: '2%', //for center align
          alignSelf: 'flex-start', //for align to right
        }}>
        <BtGoBack />
      </View>
    </View>
  );
};

export default MakerMap;

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
  },
});
