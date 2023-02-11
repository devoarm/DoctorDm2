import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';
import Colors from '../themes/Colors';

const CardFood = props => {
  return (
    <View style={styles.container}>      
      <Image source={props.image} style={{textAlign: 'center',width:64,height:64}}/>
      <Text  style={{textAlign: 'center'}}>{props.lable}</Text>
    </View>
  );
};

export default CardFood;

const styles = StyleSheet.create({
  container: {
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: Colors.white,
      padding: 20,
      borderRadius: 20,
      margin: 5,
      flexDirection: 'row',
  },
});
