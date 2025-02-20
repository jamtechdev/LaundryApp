/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { View, ActivityIndicator, Button, Text, Alert } from "react-native";
import QRCode from "react-native-qrcode-svg";
import axios from "axios";


const PAYPAY_API_KEY="a_uEWiVpQu74_9dku";
const PAYPAY_ACCESS_TOKEN="Nevmmudjtrnezf24YXfGu4lwqUPqkHfBpJ8YaYArw7Q=";
const PAYPAY_API_BASE_URL="https://api.paypay.ne.jp/v2"

{/* <PayPayQRCode orderId="order123" amount={1000} /> */}


const PayPayQRCode = ({ orderId, amount }) => {
  const [qrUrl, setQrUrl] = useState(null);
  const [paymentStatus, setPaymentStatus] = useState("PENDING");

  useEffect(() => {
    generateQRCode();
  }, []);

  const generateQRCode = async () => {
    try {
      const response = await axios.post(
        `${PAYPAY_API_BASE_URL}/codes`,
        {
          merchantPaymentId: orderId,
          amount: {
            amount: amount,
            currency: "JPY",
          },
          codeType: "ORDER_QR",
          redirectType: "WEB_LINK",
          redirectUrl: "https://yourwebsite.com/payment-success",
          orderItems: [
            {
              name: "Product Name",
              category: "Category",
              quantity: 1,
              productId: "product-123",
              unitPrice: {
                amount: amount,
                currency: "JPY",
              },
            },
          ],
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${PAYPAY_ACCESS_TOKEN}`,
            "X-API-Key": PAYPAY_API_KEY,
          },
        }
      );

      if (response.data.resultInfo.code === "SUCCESS") {
        setQrUrl(response.data.data.url);
      } else {
        Alert.alert("Error", "Failed to generate QR Code");
      }
    } catch (error) {
      console.error("QR Code Generation Error:", error);
      Alert.alert("Error", "Failed to generate QR Code");
    }
  };

  const checkPaymentStatus = async () => {
    try {
      const response = await axios.get(
        `${PAYPAY_API_BASE_URL}/payments/${orderId}`,
        {
          headers: {
            Authorization: `Bearer ${PAYPAY_ACCESS_TOKEN}`,
            "X-API-Key": PAYPAY_API_KEY,
          },
        }
      );

      if (response.data.resultInfo.code === "SUCCESS") {
        setPaymentStatus(response.data.data.status);
      } else {
        Alert.alert("Error", "Failed to check payment status");
      }
    } catch (error) {
      console.error("Payment Status Error:", error);
      Alert.alert("Error", "Failed to check payment status");
    }
  };

  return (
    <View style={{ alignItems: "center", marginTop: 50 }}>
      <Text>Order ID: {orderId}</Text>
      {qrUrl ? <QRCode value={qrUrl} size={200} /> : <ActivityIndicator size="large" />}
      <Button title="Check Payment Status" onPress={checkPaymentStatus} />
      <Text>Status: {paymentStatus}</Text>
    </View>
  );
};

export default PayPayQRCode;
