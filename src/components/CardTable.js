import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Colors from '../themes/Colors';

export default function CardTable({children}) {
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
    backgroundColor: Colors.grayGreen,
    padding: 5,
    borderRadius: 15,
    marginStart: 10,
    marginEnd: 10,
    marginVertical: 10,
    marginBottom: 10,
    flexDirection: 'row',
    opacity: 0.8,
  },
});
