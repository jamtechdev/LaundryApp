import React, { useEffect } from 'react';
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
import deviceService from '../../_services/device.service';

const {width} = Dimensions.get('window');

const ApplianceScreen = ({navigation}) => {
  const {setAppliancesValue, setAuthToken} = useAppContext();
  const appliances = [
    {
      id: 1,
      icon: '🧺',
      name: StringConst.equipmentOne,
      style: styles.primaryButton,
    },
    {
      id: 2,
      icon: '🌬️',
      name: StringConst.equipmentTwo,
      style: styles.secondaryButton,
    },
    {
      id: 3,
      icon: '🧼',
      name: StringConst.equipmentThree,
      style: styles.secondaryButton,
    },
    {
      id: 4,
      icon: '👟',
      name: StringConst.equipmentFour,
      style: styles.tertiaryButton,
    },
  ];


  useEffect(() => {
    const fetchData = async () => {
      try {
        const authResponse = await deviceService.getAuthToken();
        const token = authResponse.data.access_token;
        setAuthToken(token);

        // Query by shop id
        const deviceIdResponse = await deviceService.getLandryDeviceListwithDeviceId('00087000003', token)
        const deviceShopResponse = await deviceService.getLandryDeviceListwithShop(87, token)
        console.log(deviceIdResponse,'Device List by Shop ID:',deviceShopResponse);

      } catch (error) {
        console.error('Error in API calls:', error);
      }
    };

    fetchData();
  }, []);


  const handleApplianceClick = item => {
    if (item) {
      setAppliancesValue(item);
      navigation.navigate(RouteName.Machine_Selection);
    }
  };

  return (
    <View style={styles.container}>
      {/* Heading */}
      <Text style={styles.heading}>
        {StringConst.applianceHeading}
      </Text>

      {/* First (selected) button */}
      <TouchableOpacity
        style={styles.selectedButton}
        onPress={() => handleApplianceClick(appliances[0])}>
        <Text style={styles.selectedButtonText}>{appliances[0].name}</Text>
      </TouchableOpacity>

      {/* Row with 2 half-width buttons */}
      <View style={styles.row}>
        <View style={[styles.halfButtonWrapper, {marginRight: 10}]}>
          <TouchableOpacity
            style={styles.unselectedButton}
            onPress={() => handleApplianceClick(appliances[1])}>
            <Text style={styles.unselectedButtonText}>{appliances[1].name}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.halfButtonWrapper}>
          <TouchableOpacity
            style={styles.unselectedButton}
            onPress={() => handleApplianceClick(appliances[2])}>
            <Text style={styles.unselectedButtonText}>
              {appliances[2].name}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Last full-width unselected button */}
      <TouchableOpacity
        style={styles.unselectedButton}
        onPress={() => handleApplianceClick(appliances[3])}>
        <Text style={styles.unselectedButtonText}>{appliances[3].name}</Text>
      </TouchableOpacity>

      {/* Payment methods heading */}
      <Text style={styles.paymentHeading}>Available payment methods</Text>

      {/* Payment buttons row */}
      <View style={styles.paymentRow}>
        <TouchableOpacity style={styles.paymentButton}>
          <Text style={styles.paymentButtonText}>{StringConst.paypay}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.paymentButton}>
          <Text style={styles.paymentButtonText}>{StringConst.aupay}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.paymentButton}>
          <Text style={styles.paymentButtonText}>{StringConst.dPayment}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.paymentButton}>
          <Text style={styles.paymentButtonText}>{StringConst.rpay}</Text>
        </TouchableOpacity>
      </View>


      <FooterText />
    </View>
  );
};

export default ApplianceScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingTop: 60,
  },
  heading: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000000',
    textAlign: 'center',
    marginBottom: 40,
  },
  // Selected (first) button style: black background, white text
  selectedButton: {
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingVertical: 15,
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 2,
    borderColor: '#000',
  },
  selectedButtonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: '400',
  },
  // Wrapper for half-width buttons
  row: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  halfButtonWrapper: {
    flex: 1,
  },
  // Unselected button style: white background, black border
  unselectedButton: {
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 8,
    paddingVertical: 15,
    alignItems: 'center',
    marginBottom: 20,
  },
  unselectedButtonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: '400',
  },
  // Payment heading
  paymentHeading: {
    fontSize: 16,
    fontWeight: '400',
    color: '#000',
    textAlign: 'center',
    marginBottom: 20,
    paddingVertical: 10,
    backgroundColor: '#eee',
    marginTop: 40,
  },
  // Payment buttons row
  paymentRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  paymentButton: {
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 8,
    paddingVertical: 15,
    width: (width - 60) / 4, // 20px padding on each side + spacing
    alignItems: 'center',
  },
  paymentButtonText: {
    color: '#000',
    fontSize: 14,
    fontWeight: '400',
  },
});
