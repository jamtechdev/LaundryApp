import React, {useState, useEffect} from 'react';
import AppNavigator from './src/navigation';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import {View, Text, StyleSheet} from 'react-native';
import {AppProvider} from './src/_context/AppProvider';

function App() {
  return (
    <SafeAreaProvider>
      <AppProvider>
        <AppNavigator />
      </AppProvider>
    </SafeAreaProvider>
  );
}

export default App;
