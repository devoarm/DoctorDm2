import {StyleSheet, Text, View, Button} from 'react-native';
import React from 'react';
import MapView from 'react-native-maps';
import {Marker} from 'react-native-maps';
import {enableLatestRenderer} from 'react-native-maps';
import BtGoBack from '../components/BtGoBack';
enableLatestRenderer();

const MapHealPosition = ({route, navigation}) => {
  const {position} = route.params;

  return (
    <View style={{flex: 1}}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: position.latitude,
          latitudeDelta: 0.1,
          longitude: position.longitude,
          longitudeDelta: 0.1,
        }}>
        <Marker
          coordinate={{
            latitude: position.latitude,
            latitudeDelta: 0.1,
            longitude: position.longitude,
            longitudeDelta: 0.1,
          }}
        />
      </MapView>
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

export default MapHealPosition;

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
  },
});
