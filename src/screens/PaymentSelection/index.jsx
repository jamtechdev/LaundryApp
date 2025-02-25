import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Image } from 'react-native';
import RouteName from '../../utils/Constant';
import StringConst from '../../utils/StringConstant';
import { useAppContext } from '../../_context/AppProvider';
import ActionButtons from '../../components/ActionButtons';
import FooterText from '../../components/FooterText';
import Colors from '../../utils/Colors';
import Images from '../../utils/Images';

const { width } = Dimensions.get('window');

const PaymentSelection = ({ navigation }) => {
  const {
    appliancesValue,
    machineValue,
    courseValue,
    setPaymentValue,
    timeRangeValue,
    usingTimeValue,
  } = useAppContext();

  const paymentMethods = [
    { id: 1, name: StringConst.paypay, image: Images.paypay },
    { id: 2, name: StringConst.aupay, image: Images.aupay },
    { id: 3, name: StringConst.dPayment, image: Images.dpay },
    { id: 4, name: StringConst.rpay, image: Images.rpay },
  ];

  const handlePaymentClick = (option) => {
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
        <View style={styles.courseBox}>
          {courseValue.id === 4 ? (
            <Text style={[styles.selectedText, styles.courseText]}>
              {courseValue?.title} -{' '}
              <Text style={styles.usingTimeBox}>{usingTimeValue.time}</Text> - {usingTimeValue.price}
            </Text>
          ) : (
            <Text style={[styles.selectedText, styles.courseText]}>
              {courseValue?.title} - {courseValue.time} - {courseValue.price}
            </Text>
          )}
        </View>
      </View>

      <View style={styles.header}>
        <Text style={styles.headerText}>{StringConst.choosePayment}</Text>
      </View>

      <View style={styles.paymentContainer}>
        {paymentMethods.map((option) => (
          <TouchableOpacity
            key={option.id}
            onPress={() => handlePaymentClick(option)}
            style={[styles.paymentButton, styles.selectedPaymentButton]}
          >
            <Image source={option.image} style={styles.paymentImage} />
            <Text style={styles.paymentTitle}>{option.name}</Text>
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
  selectedStyle: {
    width: '93%',
    paddingVertical: 25,
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 20,
    backgroundColor: Colors.bg,
  },
  selectedRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
  },
  selectedText: {
    fontSize: 18,
    fontWeight: '400',
    color: '#000', // black text
    textAlign: 'center',
  },
  courseBox: {
    backgroundColor: Colors.white,
    borderColor: Colors.primary,
    borderWidth: 1,
    borderRadius: 5,
    width: '85%',
    paddingVertical: 5,
    marginTop: 10,
  },
  courseText: {
    fontSize: 16,
  },
  usingTimeBox: {
    backgroundColor: '#eee',
    paddingHorizontal: 5,
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
    color: '#000', // black text
    textAlign: 'center',
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
    borderColor: Colors.secondary, // use secondary color for border
    paddingVertical: 20,
    paddingHorizontal: 13,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedPaymentButton: {
    backgroundColor: '#fff',
    borderWidth: 2,
  },
  paymentImage: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
  paymentTitle: {
    marginTop: 5,
    fontSize: 14,
    color: '#000', // black text
    textAlign: 'center',
  },
});
