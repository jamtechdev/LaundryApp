import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screen/Home';
import CourseSelectionScreen from '../screen/CourseSelectionScreen';
import DryingTimeSelectionScreen from '../screen/DryingTimeSelectionScreen';
import PaymentSelectionScreen from '../screen/PaymentSelectionScreen';
import PaymentScreen from '../screen/PaymentScreen';

const Stack = createNativeStackNavigator();

export default function RootNavigation() {
  return (
      <Stack.Navigator initialRouteName="Home"  screenOptions={{ headerShown: false }}>
        <Stack.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{ title: 'Home' }} 
        />
        <Stack.Screen 
          name="CourseSelection" 
          component={CourseSelectionScreen} 
          options={{ title: 'Select Course' }} 
        />
        <Stack.Screen 
          name="DryingTimeSelection" 
          component={DryingTimeSelectionScreen} 
          options={{ title: 'Select Drying Time' }} 
        />
        <Stack.Screen 
          name="PaymentSelection" 
          component={PaymentSelectionScreen} 
          options={{ title: 'Select Payment Method' }} 
        />
        <Stack.Screen 
          name="PaymentScreen" 
          component={PaymentScreen} 
          options={{ title: 'Payment' }} 
        />
      </Stack.Navigator>
  );
}
