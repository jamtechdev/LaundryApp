import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import RootNavigation from './src/navigation';

export default function App() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{flex: 1, backgroundColor: '#f5f5f5'}}>
        <NavigationContainer>
          <RootNavigation />
        </NavigationContainer>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
