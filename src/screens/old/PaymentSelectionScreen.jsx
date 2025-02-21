import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

const PaymentSelectionScreen = ({ route }) => {
    const { course, selectedTime } = route.params;
    const navigation = useNavigation();

    const handlePayment = (method) => {
        navigation.navigate("PaymentScreen", { course, selectedTime, method });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Select Payment Method</Text>
            <TouchableOpacity style={styles.paymentButton} onPress={() => handlePayment("PayPay")}>
                <Text style={styles.paymentText}>Pay with PayPay</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.paymentButton} onPress={() => handlePayment("Credit Card")}>
                <Text style={styles.paymentText}>Credit Card</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: "#f8f8f8" },
    title: { fontSize: 22, fontWeight: "bold", textAlign: "center", marginBottom: 20 },
    paymentButton: { padding: 15, backgroundColor: "#007bff", marginVertical: 10, borderRadius: 10 },
    paymentText: { fontSize: 18, fontWeight: "bold", color: "#fff", textAlign: "center" }
});

export default PaymentSelectionScreen;
