import React from "react";
import { ImageBackground, StyleSheet, Text, View } from "react-native";

const BackGround1 = ({ children }) => (
  <View style={styles.container}>
    <ImageBackground
      source={require("../../assets/theme/background.png")}
      resizeMode="cover"
      style={styles.image}
    >
      {children}
    </ImageBackground>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
  },
});

export default BackGround1;
