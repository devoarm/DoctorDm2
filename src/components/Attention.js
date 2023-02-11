import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Colors from '../themes/Colors';

export default function Attention({children}) {
  return (
    <View style={styles.container}>
      <View style={{flex: 1}}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.gray,
    padding: 15,
    borderRadius: 10,
    marginEnd: 5,
    marginHorizontal: 20,
    marginVertical: 20,
    height:129,
    width:200,
    alignSelf: 'flex-end',
  },
});
