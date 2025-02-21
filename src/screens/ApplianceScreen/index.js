import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import RouteName from '../../utils/Constant';
import StringConst from '../../utils/StringConstant';
import { useAppContext } from '../../_context/AppProvider';

const { width } = Dimensions.get('window');

const ApplianceScreen = ({ navigation }) => {
  const {setAppliancesValue } = useAppContext()
  const appliances = [
    { id: 1, icon: "🧺", name: StringConst.equipmentOne, style: styles.primaryButton },
    { id: 2, icon: "🌬️", name: StringConst.equipmentTwo, style: styles.secondaryButton },
    { id: 3, icon: "🧼", name: StringConst.equipmentThree, style: styles.secondaryButton },
    { id: 4, icon: "👟", name: StringConst.equipmentFour, style: styles.tertiaryButton },
  ];

  const handleApplianceClick = (item) =>{
      if(item){
        setAppliancesValue(item)
        navigation.navigate(RouteName.Machine_Selection);
      }
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>{StringConst.applianceHeading}</Text>
      </View>
      <View style={styles.spacer} />
      <View style={styles.applianceContainer}>
      {appliances.map((item, index) => {
        if (index === 0 || index === 3) {
          return (
            <TouchableOpacity
              key={item.id}
              style={[styles.fullWidthButton, item.style]}
              onPress={()=>handleApplianceClick(item)}
            >
              <Text style={styles.buttonText}>{item.icon} {item.name}</Text>
            </TouchableOpacity>
          );                                                     
        } else if (index === 1) {
          return (
            <View key="row" style={styles.row}>
              {appliances.slice(1, 3).map(subItem => (
                <TouchableOpacity key={subItem.id} style={[styles.halfButton, subItem.style]} onPress={()=>handleApplianceClick(item)}>
                  <Text style={styles.buttonText}>{subItem.icon} {subItem.name}</Text>
                </TouchableOpacity>
              ))}
            </View>
          );
        }
      })}
      </View>

      <View style={styles.spacer} />
      <View style={styles.spacer} />

      <View style={styles.paymentSection}>
        <Text style={styles.paymentTitle}>Available Payment Methods</Text>
        <View style={styles.spacer} />
        <View style={styles.paymentRow}>
          <TouchableOpacity style={styles.paymentButton}>
            <Text style={styles.paymentText}>{StringConst.paypay}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.paymentButton}>
            <Text style={styles.paymentText}>{StringConst.aupay}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.paymentButton}>
            <Text style={styles.paymentText}>{StringConst.dPayment}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.paymentButton}>
            <Text style={styles.paymentText}>{StringConst.rpay}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ApplianceScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 20,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  header: {
    marginTop: 70,
    marginVertical: 20,
    paddingVertical: 15,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color:  '#3498db',
    textAlign: 'center'
  },
  applianceContainer: {
    width: '90%',
    alignItems: 'center',
    gap: 8
  },
  fullWidthButton: {
    width: '100%',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 15,
  },
  halfButton: {
    width: '48%',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 15,
  },
  primaryButton: {
    backgroundColor: '#3498db',
  },
  secondaryButton: {
    backgroundColor: '#2ecc71',
  },
  tertiaryButton: {
    backgroundColor: '#e67e22',
  },
  buttonText: {
    fontSize: 16,
    color: '#ffffff',
    fontWeight: 'bold',
  },
  spacer: {
    height: 40,
  },
  paymentSection: {
    width: '90%',
    alignItems: 'center',
  },
  paymentTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#34495e',
  },
  paymentRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  paymentButton: {
    backgroundColor: '#ecf0f1',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
    width: width * 0.22, // Responsive width for different screen sizes
  },
  paymentText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2c3e50',
  },
});
