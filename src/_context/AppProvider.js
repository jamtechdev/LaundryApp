// src/context/AppProvider.js
import React, { createContext, useContext, useState } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [appliancesValue, setAppliancesValue] = useState({});
  const [machineValue, setMachineValue] = useState({});
  const [courseValue, setCourseValue] = useState({});
  const [paymentValue, setPaymentValue] = useState({});
  const [timeRangeValue, setTimeRangeValue] = useState({});
  const [usingTimeValue, setUsingTimeValue] = useState({});
  const [authToken, setAuthToken] = useState(null);

  return (
    <AppContext.Provider
      value={{
        appliancesValue,
        machineValue,
        courseValue,
        paymentValue,
        timeRangeValue,
        usingTimeValue,
        setTimeRangeValue,
        setUsingTimeValue,
        setAppliancesValue,
        setMachineValue,
        setCourseValue,
        setPaymentValue,
        // API functions
        authToken,
        setAuthToken
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
