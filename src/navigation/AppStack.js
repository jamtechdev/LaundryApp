import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {ApplianceScreen, CompletionScreen, CourseSelection, MachineSelection, PaymentQR, PaymentSelection, TimeRangeScreen, UsageTimeScreen} from '../screens';
import RouteName from '../utils/Constant';

const Stack = createNativeStackNavigator();
const AppStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName={RouteName.Appliance_Screen}>
      <Stack.Screen name={RouteName.Appliance_Screen} component={ApplianceScreen} />
      <Stack.Screen name={RouteName.Machine_Selection} component={MachineSelection} />
      <Stack.Screen name={RouteName.Course_Selection} component={CourseSelection} />
      <Stack.Screen name={RouteName.Time_Range_Selection} component={TimeRangeScreen} />
      <Stack.Screen name={RouteName.Using_Time_Selection} component={UsageTimeScreen} />
      <Stack.Screen name={RouteName.Payment_Selection} component={PaymentSelection} />
      <Stack.Screen name={RouteName.Payment_QR} component={PaymentQR} />
      <Stack.Screen name={RouteName.Completion_Screen} component={CompletionScreen} />
    </Stack.Navigator>
  );
};

export default AppStack;
