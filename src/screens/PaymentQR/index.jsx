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

const PaymentQR = ({navigation}) => {
  const {appliancesValue, machineValue, courseValue, paymentValue} =
    useAppContext();

  const [qrCodeData, setQrCodeData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [paymentId, setPaymentId] = useState(null);

  useEffect(() => {
    initiatePayment();
  }, []);

  useEffect(() => {
    let interval;

    if (paymentId) {
      interval = setInterval(checkPaymentStatus, 10000); // Poll every 4 seconds
    }

    return () => {
      if (interval) clearInterval(interval); // Cleanup on unmount
    };
  }, [paymentId]);

  const initiatePayment = async () => {
    try {
      const response = await axios.post(
        'http://localhost:3000/paypay', // Your backend API
        {
          amount: courseValue.price, // Use course price as payment amount
          userId: 'USER123',
        },
      );

      console.log('API Response:', response.data);
      if (
        response.data &&
        response.data.success &&
        response.data.paymentUrl &&
        response.data.paymentId
      ) {
        setQrCodeData(response.data.paymentUrl);
        setPaymentId(response.data.paymentId); // Store paymentId for status check
      } else {
        Alert.alert('Payment Error', 'Invalid API response.');
        navigation.goBack();
      }
    } catch (error) {
      console.error('Payment API Error:', error);
      Alert.alert('Payment Error', 'Failed to fetch QR code.');
      navigation.goBack();
    } finally {
      setLoading(false);
    }
  };

  const checkPaymentStatus = async () => {
    if (!paymentId) return;

    try {
      const response = await axios.get(
        `http://localhost:3000/paypay/status/${paymentId}`,
      );

      console.log('Payment Status Response:', response.data);

      if (response.data && response.data.success) {
        setPaymentStatus(response.data.paymentStatus);

        if (response.data.paymentStatus === 'COMPLETED') {
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

  return (
    <View style={styles.container}>
      {/* Selected Appliance, Machine & Course */}
      <View style={styles.selectedContainer}>
        <Text style={styles.selectedText}>
          {appliancesValue.icon} {appliancesValue.name}
        </Text>
        <View style={styles.machineContainer}>
          <Text style={styles.machineIcon}>
            {machineValue.icon} {machineValue.capacity}
          </Text>
        </View>
        <Text style={styles.courseText}>{courseValue.title}</Text>
        <Text style={styles.courseText}>
          • {courseValue.time} • ¥{courseValue.price}
        </Text>
      </View>

      <View style={styles.header}>
        <Text style={styles.headerText}>{StringConst.makePayment}</Text>
        <View style={[styles.paymentButton, styles.selectedPaymentButton]}>
          <Text style={[styles.paymentText, styles.selectedPaymentText]}>
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
            Payment Expired. Please try again.
          </Text>
        ) : qrCodeData ? (
          <QRCode value={qrCodeData} size={250} />
        ) : (
          <Text style={styles.errorText}>Error loading QR code</Text>
        )}
      </View>

      <Text style={styles.qrText}>{StringConst.paymentNote}</Text>

      {paymentStatus === 'EXPIRED' && (
        <TouchableOpacity style={styles.retryButton} onPress={initiatePayment}>
          <Text style={styles.retryButtonText}>Retry Payment</Text>
        </TouchableOpacity>
      )}

      <ActionButtons />
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
  selectedText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2c3e50',
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
    marginVertical: 5,
    paddingVertical: 10,
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#3498db',
    textAlign: 'center',
  },
  qrText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#34495e',
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
    borderColor: '#2ecc71',
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  selectedPaymentButton: {
    backgroundColor: '#2ecc71',
    borderWidth: 2,
  },
  retryButton: {
    backgroundColor: '#e74c3c',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 20,
  },
  retryButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default PaymentQR;
