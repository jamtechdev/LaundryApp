import React, { useState, useEffect } from 'react';
import { View, ActivityIndicator, Alert } from 'react-native';
import { WebView } from 'react-native-webview';
import axios from 'axios';

const PaymentScreen = ({ navigation }) => {
    const [paymentUrl, setPaymentUrl] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        initiatePayment();
    }, []);

    const initiatePayment = async () => {
        try {
            const response = await axios.get('https://laundry-pay.net/BluetoothTransaction', {
                params: {
                    Amount: 500,
                    PayType: 5, // WeChat Pay
                    env: 1,  // 1 = Production, 0 = Test
                    paymentid: `PAY${Date.now()}`,
                    userID: `USER${Date.now()}`,
                    deviceid: "DEVICE123",
                    deviceCourceNo: "COURSE456"
                }
            });
            console.log(response)
            const htmlResponse = response.data;
            const regex = /<form action="([^"]+)"/;
            const match = htmlResponse.match(regex);

            if (htmlResponse) {
                setPaymentUrl(htmlResponse);
            } else {
                Alert.alert('Payment Error', 'Invalid API response.');
                navigation.goBack();
            }
        } catch (error) {
            console.error('Payment API Error:', error);
            Alert.alert('Payment Error', 'Failed to fetch payment URL.');
            navigation.goBack();
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={{ flex: 1 }}>
            {loading ? (
                <ActivityIndicator size="large" color="#0000ff" style={{ marginTop: 20 }} />
            ) : (
                paymentUrl ? (
                        <WebView source={{ html: paymentUrl }} />
                ) : (
                    Alert.alert('Error', 'No payment URL found.')
                )
            )}
        </View>
    );
};

export default PaymentScreen;
