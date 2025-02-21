import React from 'react';
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

const { width } = Dimensions.get('window');

const CourseSelection = ({ navigation }) => {
  const { appliancesValue, machineValue, setCourseValue } = useAppContext();

  const washingOptions = [
    { id: 1, title: "Plenty of washing and drying", capacity: "15kg", time: "60 min", price: "1200 yen" },
    { id: 2, title: "Light wash and dry", capacity: "11kg", time: "50 min", price: "1000 yen" },
    { id: 3, title: "Washing only", capacity: "15kg", time: "20 min", price: "700 yen" },
    { id: 4, title: "Dry only", capacity: "11kg", time: "Per 10 minutes", price: "100 yen" },
  ];

  const handleMachinesClick = (item) => {
    if (item) {
      setCourseValue(item);
      navigation.navigate(RouteName.Payment_Selection);
    }
  };

  return (
    <View style={styles.container}>
      {/* Selected Appliances & Machines */}
      <View style={styles.selectedStyle}>
        <Text style={[styles.selectedText]}>
          {appliancesValue.icon} {appliancesValue.name}
        </Text>
        <Text style={[styles.selectedText]}>
          {machineValue.icon} {machineValue.capacity}
        </Text>
      </View>

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>{StringConst.courseDesired}</Text>
      </View>

      <View style={styles.applianceContainer}>
        {washingOptions.map((option) => (
          <TouchableOpacity
            key={option.id}
            style={[styles.fullWidthButton, styles.secondaryButton]}
            onPress={() => handleMachinesClick(option)}
          >
            <View style={styles.textContainer}>
              <Text style={styles.title}>{option.title}</Text>
            </View>
            <View style={styles.detailsContainer}>
              <Text style={styles.price}>({option.capacity})</Text>
            </View>
            <View style={styles.detailsContainer}>
              <Text style={styles.price}>{option.price}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.spacer} />
      <ActionButtons />
    </View>
  );
};

export default CourseSelection;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 20,
    alignItems: 'center',
    backgroundColor: '#ffffff',
    paddingHorizontal: 15,
  },
  header: {
    marginTop: 20,
    marginBottom: 15,
    paddingVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#3498db',
    textAlign: 'center',
  },
  applianceContainer: {
    width: '100%',
    alignItems: 'center',
    marginTop: 10,
  },
  textContainer: {
    flex: 1,
  },
  detailsContainer: {
    alignItems: 'flex-end',
  },
  selectedStyle: {
    width: '100%',
    paddingVertical: 15,
    borderRadius: 10,
    borderColor: '#3498db',
    borderWidth: 2,
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 20,
    backgroundColor: '#ecf5ff',
  },
  selectedText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#34495e',
    marginBottom: 5,
  },
  fullWidthButton: {
    width: '100%',
    paddingVertical: 18,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 15,
    flexDirection: 'row',
    gap: 20,
    justifyContent: 'space-between',
    paddingHorizontal: 15,
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
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#34495e',
  },
  spacer: {
    height: 20,
  },
});
