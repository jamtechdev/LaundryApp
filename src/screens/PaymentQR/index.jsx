import React, { useState, useEffect } from 'react';
import { 
    View, 
    Text, 
    ActivityIndicator, 
    Alert, 
    TouchableOpacity, 
    StyleSheet 
} from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import axios from 'axios';
import { useAppContext } from '../../_context/AppProvider';
import ActionButtons from '../../components/ActionButtons';
import RouteName from '../../utils/Constant';
import StringConst from '../../utils/StringConstant';

const PaymentQR = ({ navigation }) => {
    const { appliancesValue, machineValue, courseValue, paymentValue } = useAppContext();
    
    const [qrCodeData, setQrCodeData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        initiatePayment();
    }, []);

    const initiatePayment = async () => {
        try {
            const response = await axios.post(
                'http://localhost:3000/paypay',
                {
                    amount: courseValue.price,
                }
            );

            console.log('API Response:', response.data);

            // Ensure we have a valid payment URL
            if (response.data && response.data.success && response.data.paymentUrl) {
                setQrCodeData(response.data.paymentUrl);
            } else {
                Alert.alert('Payment Error', 'Invalid API response.');
                navigation.goBack();
            }
        } catch (error) {
            console.error('Payment API Error:', error);
            Alert.alert('Payment Error', 'Failed to fetch QR code.');
            // navigation.goBack();
        } finally {
            setLoading(false);
        }
    };

    const completeAction = () => {
        navigation.replace(RouteName.Completion_Screen);  // Replace to prevent going back
    };

    return (
        <View style={styles.container}>
            {/* Selected Appliance, Machine & Course */}
            <View style={styles.selectedContainer}>
                <Text style={styles.selectedText}>
                    {appliancesValue.icon} {appliancesValue.name}
                </Text>
                <View style={styles.machineContainer}>
                    <Text style={styles.machineIcon}>{machineValue.icon} {machineValue.capacity}</Text>
                </View>
                <Text style={styles.courseText}>{courseValue.title}</Text>
                <Text style={styles.courseText}>• {courseValue.time} • ¥{courseValue.price}</Text>
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

            {/* QR Code Generation */}
            <View style={styles.qrContainer}>
                {loading ? (
                    <ActivityIndicator size="large" color="#0000ff" />
                ) : qrCodeData ? (
                    <QRCode value={qrCodeData} size={250} />
                ) : (
                    <Text style={styles.errorText}>Error loading QR code</Text>
                )}
            </View>

            <Text style={styles.qrText}>{StringConst.paymentNote}</Text>

            <TouchableOpacity style={styles.completeButton} onPress={completeAction}>
                <Text style={styles.completeButtonText}>Completion</Text>
            </TouchableOpacity>

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
        marginVertical: 15,
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
    paymentText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#2c3e50',
    },
    selectedPaymentText: {
        color: '#fff',
    },
    completeButton: {
        backgroundColor: '#2ecc71',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 8,
        marginTop: 20,
    },
    completeButtonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#fff',
    },
});

export default PaymentQR;
