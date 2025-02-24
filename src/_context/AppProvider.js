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

  // API function to get devices (via GET) and filter out devices whose parent_id has "99" in the 6th-7th digits.
  const getDevices = async (token) => {
    try {
      const response = await fetch('https://api.example.com/api/devices', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error('Failed to fetch devices');
      }
      const devices = await response.json();
      const filteredDevices = devices.filter((device) => {
        const pid = device.parent_id;
        // Ensure parent_id is long enough before slicing
        return pid && pid.length >= 7 && pid.slice(5, 7) !== '99';
      });
      return filteredDevices;
    } catch (error) {
      console.error('Error fetching devices:', error);
      throw error;
    }
  };

  // API function to get device courses (via GET)
  const getDeviceCourses = async (token) => {
    try {
      const response = await fetch('https://api.example.com/api/devicecourses', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error('Failed to fetch device courses');
      }
      const courses = await response.json();
      return courses;
    } catch (error) {
      console.error('Error fetching device courses:', error);
      throw error;
    }
  };


  // curl -X GET "https://laundry-pay.net/admin/api/data/LandryDeviceList/query-column?q=shop%20eq%201" -H "Accept: application/json"


  // curl -X GET "https://laundry-pay.net/admin/api/data/LandryDeviceList/query-column?q=deviceid%20eq%2000001000001" -H "Accept: application/json"

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
        getDevices,
        getDeviceCourses,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
