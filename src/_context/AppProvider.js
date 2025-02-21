// src/context/AppProvider.js
import React, {createContext, useContext, useState} from 'react';
import {SafeAreaView} from 'react-native';

const AppContext = createContext();

export const AppProvider = ({children}) => {
  const [appliancesValue, setAppliancesValue] = useState({});
  const [machineValue, setMachineValue] = useState({});
  const [courseValue, setCourseValue] = useState({});
  const [paymentValue, setPaymentValue] = useState({});

  return (
    <AppContext.Provider
      value={{
        appliancesValue,
        machineValue,
        courseValue,
        paymentValue,

        setAppliancesValue,
        setMachineValue,
        setCourseValue,
        setPaymentValue,
      }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
