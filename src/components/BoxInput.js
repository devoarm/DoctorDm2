import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Colors from '../themes/Colors';

export default function BoxInput({children}) {
  return (
    <View style={styles.container}>
      <View style={{flex: 1}}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  BoxInput: {
    marginTop: 20,
    backgroundColor: '#F0EEEE',
    height: 40,
    borderRadius: 20,
    marginHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
});
