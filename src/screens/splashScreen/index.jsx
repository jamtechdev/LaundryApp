import React, { useEffect } from 'react';
import { StyleSheet, View, Text, ActivityIndicator } from 'react-native';
import StringConst from '../../utils/StringConstant';

const SplashScreen = ({ navigation }) => {

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{StringConst.appName}</Text>
      <ActivityIndicator size="large" color="#fff" style={styles.loader} />
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3498db', // Blue theme background
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff', // White text for contrast
    marginBottom: 20,
  },
  loader: {
    marginTop: 10,
  },
});
