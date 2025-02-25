import React, { useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image,
} from 'react-native';
import RouteName from '../../utils/Constant';
import StringConst from '../../utils/StringConstant';
import { useAppContext } from '../../_context/AppProvider';
import ActionButtons from '../../components/ActionButtons';
import FooterText from '../../components/FooterText';
import Colors from '../../utils/Colors';
import Images from '../../utils/Images'; // Import your Images object
import deviceService from '../../_services/device.service';

const { width } = Dimensions.get('window');

const ApplianceScreen = ({ navigation }) => {
  const { setAppliancesValue, setAuthToken, courseList, setCourseList } = useAppContext();
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
        const deviceShopResponse = await deviceService.getLandryDeviceListwithShop(87, token);
        const deviceIdResponse = await deviceService.getLandryDeviceListwithDeviceId('00087000001', token);
        const coursedResponse = await deviceService.getLandryDeviceCourseList('00087000001', token);
        setCourseList(coursedResponse.data.data);
        console.log(deviceIdResponse, 'Device List by Shop ID:', deviceShopResponse, coursedResponse);
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
        style={[styles.selectedButton, { borderColor: Colors.primary }]}
        onPress={() => handleApplianceClick(appliances[0])}>
        <Text style={styles.selectedButtonText}>{appliances[0].name}</Text>
      </TouchableOpacity>

      {/* Row with 2 half-width buttons */}
      <View style={styles.row}>
        <View style={[styles.halfButtonWrapper, { marginRight: 10 }]}>
          <TouchableOpacity
            style={[styles.unselectedButton, { borderColor: Colors.primary }]}
            onPress={() => handleApplianceClick(appliances[1])}>
            <Text style={styles.unselectedButtonText}>{appliances[1].name}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.halfButtonWrapper}>
          <TouchableOpacity
            style={[styles.unselectedButton, { borderColor: Colors.secondary }]}
            onPress={() => handleApplianceClick(appliances[2])}>
            <Text style={styles.unselectedButtonText}>
              {appliances[2].name}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Last full-width unselected button */}
      <TouchableOpacity
        style={[styles.unselectedButton, { borderColor: Colors.tertiary }]}
        onPress={() => handleApplianceClick(appliances[3])}>
        <Text style={styles.unselectedButtonText}>{appliances[3].name}</Text>
      </TouchableOpacity>

      {/* Payment Methods Section */}
      <View style={styles.paymentSection}>
        <Text style={styles.paymentHeading}>利用可能な支払い方法</Text>
        <View style={styles.paymentRow}>
          <TouchableOpacity style={styles.paymentButton}>
            <Image source={Images.paypay} style={styles.paymentImage} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.paymentButton}>
            <Image source={Images.aupay} style={styles.paymentImage} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.paymentButton}>
            <Image source={Images.dpay} style={styles.paymentImage} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.paymentButton}>
            <Image source={Images.rpay} style={styles.paymentImage} />
          </TouchableOpacity>
        </View>
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
    paddingTop: 80,
  },
  heading: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000000',
    textAlign: 'center',
    marginBottom: 40,
  },
  selectedButton: {
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingVertical: 15,
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 2,
  },
  selectedButtonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: '400',
  },
  row: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  halfButtonWrapper: {
    flex: 1,
  },
  unselectedButton: {
    backgroundColor: '#FFF',
    borderWidth: 1,
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
  paymentSection: {
    backgroundColor: Colors.bg,
    paddingHorizontal: 5,
    paddingVertical: 20,
    marginTop: 50,
  },
  paymentHeading: {
    fontSize: 16,
    fontWeight: '400',
    color: '#000',
    textAlign: 'center',
    marginBottom: 20,
    paddingVertical: 10,
  },
  paymentRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  paymentButton: {
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: Colors.primary,
    borderRadius: 8,
    paddingVertical: 15,
    width: (width - 60) / 4,
    alignItems: 'center',
  },
  paymentImage: {
    width: 40, // adjust as needed
    height: 40, // adjust as needed
    resizeMode: 'contain',
  },
});
