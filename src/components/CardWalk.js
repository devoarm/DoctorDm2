import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';
import Colors from '../themes/Colors';

const CardWalk = props => {
  return (
    <View style={styles.container}>      
      <Image source={props.image} />
      <Text style={{textAlign: 'center'}}>{props.lable}</Text>
    </View>
  );
};

export default CardWalk;

const styles = StyleSheet.create({
  container: {
    height:129,
    width:87,
    backgroundColor: Colors.white,
    justifyContent:'center',
    alignItems:'center',
    alignSelf: 'flex-start',
    margin: 5,
    borderRadius: 20,
    padding: 10,
  },
});
