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

  // API function to get a token (via POST)
  const getToken = async (username, password) => {
    try {
      const response = await fetch('https://api.example.com/auth/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
      if (!response.ok) {
        throw new Error('Failed to fetch token');
      }
      const data = await response.json();
      // Assuming the token is returned as: { token: "YOUR_TOKEN" }
      return data.token;
    } catch (error) {
      console.error('Error fetching token:', error);
      throw error;
    }
  };

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
        getToken,
        authToken,
        setAuthToken
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
