import React, { useState, useEffect } from "react";
import { View, Text, ActivityIndicator, StyleSheet, TouchableOpacity, Alert } from "react-native";
import QRCode from "react-native-qrcode-svg";
import axios from "axios";

const PAYPAY_API_KEY="a_uEWiVpQu74_9dku";
const PAYPAY_ACCESS_TOKEN="Nevmmudjtrnezf24YXfGu4lwqUPqkHfBpJ8YaYArw7Q=";
const PAYPAY_API_BASE_URL="https://api.paypay.ne.jp/v2"

const PaymentScreen = ({ route, navigation }) => {
    const { course, selectedTime, method } = route.params;
    const [qrCodeUrl, setQrCodeUrl] = useState(null);
    const [loading, setLoading] = useState(true);
    const [paymentStatus, setPaymentStatus] = useState("PENDING");

    // Generate QR Code Payment URL
    const generateQRCode = async () => {
        try {
            const response = await axios.post("https://api.paypay.ne.jp/v2/codes", {
                merchantPaymentId: `order_${Date.now()}`,
                amount: {
                    amount: course.fee,
                    currency: "JPY"
                },
                codeType: "ORDER_QR",
                redirectType: "WEB_LINK",
                redirectUrl: "https://yourwebsite.com/payment-success",
                orderItems: [
                    {
                        name: course.devicecourcename,
                        category: "Laundry",
                        quantity: 1,
                        productId: course.deviceid,
                        unitPrice: {
                            amount: course.fee,
                            currency: "JPY"
                        }
                    }
                ]
            }, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${PAYPAY_ACCESS_TOKEN}`,
                    "X-API-Key": PAYPAY_API_KEY,
                  },
            });

            if (response.data.resultInfo.code === "SUCCESS") {
                setQrCodeUrl(response.data.data.url);
            } else {
                Alert.alert("Error", "Failed to generate QR Code");
            }
        } catch (error) {
            console.error("QR Code Generation Error:", error);
            Alert.alert("Error", "Failed to generate QR Code");
        } finally {
            setLoading(false);
        }
    };

    // Check Payment Status
    const checkPaymentStatus = async () => {
        try {
            const response = await axios.get(`https://api.paypay.ne.jp/v2/payments/${course.deviceid}`, {
                headers: {
                    Authorization: `Bearer ${PAYPAY_ACCESS_TOKEN}`,
                    "X-API-Key": PAYPAY_API_KEY,
                  },
            });

            if (response.data.data.status === "COMPLETED") {
                setPaymentStatus("COMPLETED");
                Alert.alert("Payment Successful", "Your payment has been processed.");
                navigation.navigate("PaymentSuccess"); // Redirect to success screen
            }
        } catch (error) {
            console.error("Payment Status Error:", error);
        }
    };

    useEffect(() => {
        generateQRCode();
        const interval = setInterval(() => {
            if (paymentStatus === "PENDING") {
                checkPaymentStatus();
            }
        }, 5000); // Check every 5 seconds
        return () => clearInterval(interval);
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Scan the QR Code to Pay</Text>
            {loading ? (
                <ActivityIndicator size="large" />
            ) : qrCodeUrl ? (
                <>
                    <QRCode value={qrCodeUrl} size={250} />
                    <TouchableOpacity style={styles.checkButton} onPress={checkPaymentStatus}>
                        <Text style={styles.checkText}>Check Payment Status</Text>
                    </TouchableOpacity>
                </>
            ) : (
                <Text style={styles.errorText}>QR Code generation failed.</Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20 },
    title: { fontSize: 20, fontWeight: "bold", marginBottom: 20 },
    checkButton: { marginTop: 20, padding: 15, backgroundColor: "#007bff", borderRadius: 10 },
    checkText: { fontSize: 18, fontWeight: "bold", color: "#fff", textAlign: "center" },
    errorText: { color: "red", fontSize: 16, marginTop: 10 }
});

export default PaymentScreen;
