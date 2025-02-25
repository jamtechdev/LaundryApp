import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  Alert,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import axios from 'axios';
import { useAppContext } from '../../_context/AppProvider';
import ActionButtons from '../../components/ActionButtons';
import RouteName from '../../utils/Constant';
import StringConst from '../../utils/StringConstant';
import FooterText from '../../components/FooterText';
import deviceService from '../../_services/device.service';
import Colors from '../../utils/Colors';

const PaymentQR = ({ navigation }) => {
  const { appliancesValue, machineValue, courseValue, paymentValue, usingTimeValue, authToken } =
    useAppContext();

  const [qrCodeData, setQrCodeData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showBtn, setShowBtn] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [paymentId, setPaymentId] = useState(null);
  const [payment, setPayment] = useState(null);

  useEffect(() => {
    initiatePayment();
  }, []);

  useEffect(() => {
    let interval;
    if (paymentId) {
      interval = setInterval(checkPaymentStatus, 15000); // Poll every 15 seconds
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [paymentId]);

  const initiatePayment = async () => {
    try {
      const response = await deviceService.initiatePayment(courseValue.price);
      console.log('API Response:', response.data);
      if (
        response.data &&
        response.data.success &&
        response.data.paymentUrl &&
        response.data.paymentId
      ) {
        setQrCodeData(response.data.paymentUrl);
        setPayment(response.data.payment);
        setPaymentId(response.data.paymentId);
        setTimeout(() => {
          setShowBtn(true);
        }, 1000 * 60 * 2);
      } else {
        Alert.alert('Payment Error', 'Invalid API response.');
      }
    } catch (error) {
      console.error('Payment API Error:', error.response);
      Alert.alert('Payment Error', 'Failed to fetch QR code.');
    } finally {
      setLoading(false);
    }
  };

  const checkPaymentStatus = async () => {
    if (!paymentId) return;
    try {
      const response = await deviceService.checkPaymentStatus(paymentId);
      console.log('Payment Status Response:', response.data);
      if (response.data && response.data.success) {
        setPaymentStatus(response.data.paymentStatus);
        if (response.data.paymentStatus === 'COMPLETED') {
          setShowBtn(true);
          handleDeviceStart();
          clearInterval(checkPaymentStatus);
          navigation.replace(RouteName.Completion_Screen);
        } else if (
          response.data.paymentStatus === 'EXPIRED' ||
          response.data.paymentStatus === 'CANCELED'
        ) {
          clearInterval(checkPaymentStatus);
        }
      } else {
        console.error('Error fetching payment status');
      }
    } catch (error) {
      console.error('Error checking payment status:', error);
    }
  };

  const handleDeviceStart = async () => {
    try {
      const response = await deviceService.startDevice('00001999987', courseValue.price, authToken);
      console.log(response);
      navigation.replace(RouteName.Completion_Screen);
    } catch (error) {
      console.error('Error starting device:', error);
    }
  };

  return (
    <View style={styles.container}>
      {/* Selected Appliance, Machine & Course */}
      <View style={styles.selectedStyle}>
        <View style={styles.selectedRow}>
          <Text style={styles.selectedText}>{appliancesValue?.name}</Text>
          <Text style={styles.selectedText}>
            {machineValue?.icon} {machineValue?.capacity}
          </Text>
        </View>
        <View style={styles.courseBox}>
          {courseValue.id === 4 ? (
            <Text style={[styles.selectedText, { fontSize: 16 }]}>
              {courseValue?.title} -{' '}
              <Text style={styles.usingTimeBox}>{usingTimeValue.time}</Text> - {usingTimeValue.price}
            </Text>
          ) : (
            <Text style={[styles.selectedText, { fontSize: 16 }]}>
              {courseValue?.title} - {courseValue.time} - {courseValue.price}
            </Text>
          )}
        </View>
      </View>

      {/* Header and Payment Method */}
      <View style={styles.header}>
        <Text style={styles.headerText}>{StringConst.makePayment}</Text>
        <View style={[styles.paymentButton, styles.selectedPaymentButton]}>
          <Text style={styles.paymentText}>{paymentValue.name}</Text>
        </View>
      </View>

      <Text style={styles.qrText}>{StringConst.scanWithDevice}</Text>
      {showBtn && (
        <TouchableOpacity style={styles.retryButton} onPress={handleDeviceStart}>
          <Text style={styles.retryButtonText}>{StringConst.deviceOperate}</Text>
        </TouchableOpacity>
      )}

      {/* QR Code or Payment Status Message */}
      <View style={styles.qrContainer}>
        {loading ? (
          <ActivityIndicator size="large" color={Colors.primary} />
        ) : paymentStatus === 'EXPIRED' || paymentStatus === 'CANCELED' ? (
          <Text style={styles.errorText}>{StringConst.paymentExpired}</Text>
        ) : qrCodeData ? (
          <QRCode value={qrCodeData} size={150} />
        ) : (
          <Text style={styles.errorText}>{StringConst.paymentError}</Text>
        )}
      </View>

      <Text style={styles.qrText}>{StringConst.paymentNote}</Text>
      {paymentStatus === 'EXPIRED' && (
        <TouchableOpacity style={styles.retryButton} onPress={initiatePayment}>
          <Text style={styles.retryButtonText}>{StringConst.paymentRetry}</Text>
        </TouchableOpacity>
      )}

      <ActionButtons />
      <FooterText />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 20,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  selectedStyle: {
    width: '93%',
    paddingVertical: 25,
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 20,
    backgroundColor: Colors.bg,
  },
  selectedRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
  },
  selectedText: {
    fontSize: 18,
    fontWeight: '400',
    color: '#000', // black text
    textAlign: 'center',
  },
  courseBox: {
    backgroundColor: Colors.white,
    borderColor: Colors.primary,
    borderWidth: 1,
    borderRadius: 5,
    width: '85%',
    paddingVertical: 5,
    marginTop: 10,
  },
  usingTimeBox: {
    backgroundColor: '#eee',
    paddingHorizontal: 5,
  },
  header: {
    marginTop: 5,
    marginBottom: 15,
    paddingVertical: 10,
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  headerText: {
    fontSize: 20,
    fontWeight: '400',
    color: '#000', // black text
    textAlign: 'center',
  },
  qrText: {
    fontSize: 15,
    fontWeight: '400',
    width: '90%',
    color: '#000', // black text
    textAlign: 'center',
    marginTop: 10,
  },
  qrContainer: {
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 16,
    color: 'red',
    marginTop: 10,
  },
  paymentButton: {
    borderWidth: 1,
    marginTop: 20,
    borderColor: Colors.primary,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  selectedPaymentButton: {
    backgroundColor: '#fff',
    borderWidth: 1,
  },
  paymentText: {
    fontSize: 16,
    fontWeight: '400',
    color: '#000', // black text
  },
  retryButton: {
    backgroundColor: '#fff',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 20,
    borderWidth: 1,
    borderColor: Colors.primary,
  },
  retryButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000', // black text
  },
});

export default PaymentQR;
