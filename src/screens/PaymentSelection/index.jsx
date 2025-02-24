import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import RouteName from '../../utils/Constant';
import StringConst from '../../utils/StringConstant';
import {useAppContext} from '../../_context/AppProvider';
import ActionButtons from '../../components/ActionButtons';
import FooterText from '../../components/FooterText';

const {width} = Dimensions.get('window');

const PaymentSelection = ({navigation}) => {
  const {
    appliancesValue,
    machineValue,
    courseValue,
    setPaymentValue,
    timeRangeValue,
    usingTimeValue,
  } = useAppContext();

  const paymentMethods = [
    {id: 1, name: StringConst.paypay},
    {id: 2, name: StringConst.aupay},
    {id: 3, name: StringConst.dPayment},
    {id: 4, name: StringConst.rpay},
  ];

  const handlePaymentClick = option => {
    setPaymentValue(option);
    navigation.navigate(RouteName.Payment_QR);
  };

  return (
    <View style={styles.container}>
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
        <Text style={styles.headerText}>{StringConst.choosePayment}</Text>
      </View>

      <View style={styles.paymentContainer}>
        {paymentMethods.map(option => (
          <TouchableOpacity
            key={option.id}
            onPress={() => handlePaymentClick(option)}
            style={[styles.paymentButton, styles.selectedPaymentButton]}>
            <Text style={[styles.paymentText, styles.selectedPaymentText]}>
              {option.name}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ActionButtons />
      <FooterText />
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
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 20,
    color: '#000',
  },
  paymentContainer: {
    width: '100%',
    alignItems: 'center',
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  paymentButton: {
    borderWidth: 1,
    borderColor: '#ccc',
    paddingVertical: 20,
    paddingHorizontal: 13,
    borderRadius: 8,
    alignItems: 'center',
  },
  selectedPaymentButton: {
    backgroundColor: '#fff',
    borderWidth: 2,
  },
  paymentText: {
    fontSize: 16,
    fontWeight: '400',
    color: '#2c3e50',
  },
  selectedPaymentText: {
    color: '#2c3e50',
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
