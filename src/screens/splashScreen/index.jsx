import React from 'react';
import { StyleSheet, View, Text, ActivityIndicator, ImageBackground } from 'react-native';
import StringConst from '../../utils/StringConstant';
import Images from '../../utils/Images';

const SplashScreen = ({ navigation }) => {
  return (
    <ImageBackground 
      source={Images.background}
      style={styles.container}
      resizeMode="cover"
    >
      <Text style={styles.title}>{StringConst.appName}</Text>
      <ActivityIndicator size="large" color="#fff" style={styles.loader} />
    </ImageBackground>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // No backgroundColor needed as the image will cover it
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 20,
  },
  loader: {
    marginTop: 10,
  },
});
