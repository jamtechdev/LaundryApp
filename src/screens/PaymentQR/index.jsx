import React, {useState, useEffect} from 'react';
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
import {useAppContext} from '../../_context/AppProvider';
import ActionButtons from '../../components/ActionButtons';
import RouteName from '../../utils/Constant';
import StringConst from '../../utils/StringConstant';
import FooterText from '../../components/FooterText';
import deviceService from '../../_services/device.service';

const PaymentQR = ({navigation}) => {
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
      interval = setInterval(checkPaymentStatus, 15000); // Poll every 4 seconds
    }

    return () => {
      if (interval) clearInterval(interval); // Cleanup on unmount
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
        setPayment(response.data.payment)
        setPaymentId(response.data.paymentId); // Store paymentId for status check
        setTimeout(() => {
          setShowBtn(true);
        }, 1000 * 60 * 2);
      } else {
        Alert.alert('Payment Error', 'Invalid API response.');
        // navigation.goBack();
      }
    } catch (error) {
      console.error('Payment API Error:', error);
      Alert.alert('Payment Error', 'Failed to fetch QR code.');
      // navigation.goBack();
    } finally {
      setLoading(false);
    }
  };

  const checkPaymentStatus = async () => {
    if (!paymentId) return;

    try {
      const response = deviceService.checkPaymentStatus(paymentId);
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

  const handleDeviceStart= async() => {
  try {
    const response = await deviceService.startDevice('00001999987', courseValue.price, authToken);
    console.log(response)
  } catch (error) {
    console.error('Error starting device:', error);
    
  }
  }

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
        <View
          style={{
            backgroundColor: '#ccc',
            width: '85%',
            paddingVertical: 5,
            marginTop: 10,
          }}>
          {courseValue.id == 4 ? (
            <Text style={[styles.selectedText, {fontSize: 16}]}>
              {courseValue?.title} - <Text style={{ backgroundColor: '#eee',}}>{usingTimeValue.time}</Text> - {usingTimeValue.price}
            </Text>
          ) : (
            <Text style={[styles.selectedText, {fontSize: 16}]}>
              {courseValue?.title} - {courseValue.time} - {courseValue.price}
            </Text>
          )}
        </View>
      </View>

      <View style={styles.header}>
        <Text style={styles.headerText}>{StringConst.makePayment}</Text>
        <View style={[styles.paymentButton, styles.selectedPaymentButton]}>
          <Text style={[styles.paymentText]}>
            {paymentValue.name}
          </Text>
        </View>
      </View>

      <Text style={styles.qrText}>{StringConst.scanWithDevice}</Text>

      {/* QR Code or Payment Status Message */}
      <View style={styles.qrContainer}>
        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : paymentStatus === 'EXPIRED' || paymentStatus === 'CANCELED' ? (
          <Text style={styles.errorText}>
           {StringConst.paymentExpired}
          </Text>
        ) : qrCodeData ? (
          <QRCode value={qrCodeData} size={250} />
        ) : (
          <Text style={styles.errorText}>{StringConst.paymentError}</Text>
        )}
      </View>

      <Text style={styles.qrText}>{StringConst.paymentNote}</Text>

      {paymentStatus === 'EXPIRED' && (
        <TouchableOpacity style={styles.retryButton} onPress={initiatePayment}>
          <Text style={styles.retryButtonText}>{StringConst.paymentRetry  }</Text>
        </TouchableOpacity>
      )}
      {showBtn && (
        <TouchableOpacity style={styles.retryButton} onPress={initiatePayment}>
          <Text style={styles.retryButtonText}>{StringConst.deviceOperate}</Text>
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
  selectedContainer: {
    width: '100%',
    backgroundColor: '#f8f9fa',
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 20,
  },
  machineIcon: {
    backgroundColor: '#ccc',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    fontWeight: 'bold',
    fontSize: 16,
    color: '#2c3e50',
    marginRight: 5,
  },
  courseText: {
    fontSize: 16,
    color: '#34495e',
    fontWeight: '600',
    marginTop: 5,
  },
  header: {
    marginTop: 20,
    marginBottom: 15,
    paddingVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  headerText: {
    fontSize: 20,
    fontWeight: '400',
    color: '#222',
    textAlign: 'center',
  },
  qrText: {
    fontSize: 15,
    fontWeight: '400',
    color: '#222',
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
    borderColor: '#444',
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  selectedPaymentButton: {
    backgroundColor: '#fff',
    borderWidth: 1,
  },
  retryButton: {
    backgroundColor: '#fff',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 20,
    borderWidth: 1,
    borderColor: '#444',
  },
  retryButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#444',
  },
  selectedStyle: {
    width: '93%',
    paddingVertical: 25,
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 20,
    backgroundColor: '#eee',
  },
  selectedRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
  },
  selectedText: {
    fontSize: 18,
    fontWeight: '400',
    color: '#000000',
    textAlign: 'center',
  },
});

export default PaymentQR;
