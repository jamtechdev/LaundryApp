import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {SplashScreen} from '../screens';
import AppStack from './AppStack';

const RootNavigator = () => {
  const [isSplash, setIsSplash] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsSplash(false);
    }, 3000);
  }, []);
  return (
    <NavigationContainer>
      {isSplash ? <SplashScreen /> : <AppStack />}
    </NavigationContainer>
  );
};

export default RootNavigator;

const styles = StyleSheet.create({});
