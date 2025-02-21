import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import RouteName from '../../utils/Constant';
import StringConst from '../../utils/StringConstant';
import { useAppContext } from '../../_context/AppProvider';
import ActionButtons from '../../components/ActionButtons';

const { width } = Dimensions.get('window');

const PaymentSelection = ({ navigation }) => {
  const { appliancesValue, machineValue, courseValue, setPaymentValue } =
    useAppContext();

  const paymentMethods = [
    { id: 1, name: StringConst.paypay },
    { id: 2, name: StringConst.aupay },
    { id: 3, name: StringConst.dPayment },
    { id: 4, name: StringConst.rpay },
  ];


  const handlePaymentClick = (option) => {
    setPaymentValue(option);
    navigation.navigate(RouteName.Payment_QR);
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
        <Text style={styles.courseText}>
          {courseValue.title} 
        </Text>
        <Text style={styles.courseText}>
        • {courseValue.time} • {courseValue.price}
        </Text>
      </View>

      <View style={styles.header}>
        <Text style={styles.headerText}>{StringConst.choosePayment}</Text>
      </View>

      <View style={styles.paymentContainer}>
        {paymentMethods.map((option) => (
          <TouchableOpacity
            key={option.id}
            onPress={() => handlePaymentClick(option)}
            style={[
              styles.paymentButton,
             styles.selectedPaymentButton
            ]}
          >
            <Text 
              style={[
                styles.paymentText,
             styles.selectedPaymentText
              ]}
            >
              {option.name}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ActionButtons />
    </View>
  );
};

export default PaymentSelection;

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
    marginVertical: 45,
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
  paymentContainer: {
    width: '100%',
    alignItems: 'center',
    marginTop: 10,
    flexDirection: 'row',
    justifyContent:'space-between',
    paddingHorizontal: 10
  },
  paymentButton: {
    borderWidth: 1,
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
    color: '#2c3e50',
  },
});
