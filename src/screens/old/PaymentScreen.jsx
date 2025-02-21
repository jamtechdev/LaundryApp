import React, { useState, useEffect } from 'react';
import { View, ActivityIndicator, Alert, Text } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import axios from 'axios';

const PaymentScreen = ({ navigation }) => {
    const [qrCodeData, setQrCodeData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        initiatePayment();
    }, []);

    const initiatePayment = async () => {
        try {
            const response = await axios.post(
                'http://localhost:3000/paypay',  // Your backend PayPay API
                {
                    amount: 500, // Amount in JPY
                    userId: "USER123"
                }
            );

            console.log('API Response:', response.data);

            // Ensure we have a valid payment URL
            if (response.data && response.data.success && response.data.paymentUrl) {
                setQrCodeData(response.data.paymentUrl); // Use the payment URL to generate QR code
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

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
            {loading ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : qrCodeData ? (
                <>
                    <Text style={{ fontSize: 18, marginBottom: 10 }}>Scan the QR Code to Pay</Text>
                    <QRCode
                        value={qrCodeData}  // Generate QR code from the payment URL
                        size={250}
                    />
                </>
            ) : (
                Alert.alert('Error', 'No QR Code found.')
            )}
        </View>
    );
};

export default PaymentScreen;
