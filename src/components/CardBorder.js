import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Colors from '../themes/Colors';

export default function CardBorder({children}) {
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
    backgroundColor: '#F0EEEE',
    padding: 15,
    borderRadius: 15,
    marginVertical: 10,
    flexDirection: 'row',
  },
});
