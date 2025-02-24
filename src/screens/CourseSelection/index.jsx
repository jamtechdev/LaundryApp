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
import FooterText from '../../components/FooterText';

const { width } = Dimensions.get('window');

const CourseSelection = ({ navigation }) => {
  const { appliancesValue, machineValue, setCourseValue , courseValue} = useAppContext();

  const washingOptions = [
    { id: 1, title: StringConst.courseOne,  capacity: "15"+ StringConst.kg, time: "60 "+StringConst.min, price: "1200 "+ StringConst.yen },
    { id: 2, title: StringConst.courseTwo,  capacity: "11"+ StringConst.kg, time: "50 "+StringConst.min, price: "1000 "+ StringConst.yen },
    { id: 3, title:StringConst.courseThree, capacity: "15"+ StringConst.kg, time: "20 "+StringConst.min, price: "700 " + StringConst.yen},
    { id: 4, title: StringConst.courseFour, capacity: "11"+ StringConst.kg, time: "10 "+StringConst.minutes, price: "100 " + StringConst.yen},
  ];

  const handleMachinesClick = (item) => {
    if (item) {
      setCourseValue(item);
      if(item.id == 4){
        navigation.navigate(RouteName.Time_Range_Selection);
      }else{
        navigation.navigate(RouteName.Payment_Selection);
      }
    }
  };

  return (
    <View style={styles.container}>
      {/* Selected Appliances & Machines */}
      <View style={styles.selectedStyle}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', width : '90%'}}>
        <Text style={[styles.selectedText]}>
           {appliancesValue.name}
        </Text>
        <Text style={[styles.selectedText]}>
          {machineValue.icon} {machineValue.capacity}
        </Text>
      </View>
      </View>

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>{StringConst.courseDesired}</Text>
      </View>

      <View style={styles.applianceContainer}>
        {washingOptions.map((option) => (
          <TouchableOpacity
            key={option.id}
            style={[styles.fullWidthButton,courseValue.id == option.id ? styles.tertiaryButton: styles.secondaryButton]}
            onPress={() => handleMachinesClick(option)}
          >
            <View style={styles.textContainer}>
              <Text style={styles.title}>{option.title}</Text>
            </View>
            <View style={styles.detailsContainer}>
              <Text style={styles.priceTime}>{option.time}</Text>
            </View>
            <View style={styles.detailsContainer}>
              <Text style={styles.price}>{option.price}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.spacer} />
      <ActionButtons />

      <FooterText />
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
    fontWeight: '400',
    color: '#222',
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
    paddingVertical: 25,
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 20,
    backgroundColor: '#eee',
  },
  selectedText: {
    fontSize: 18,
    fontWeight: '400',
    color: '#000000',
    textAlign: 'center',
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
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#999'
  },
  tertiaryButton: {
    backgroundColor: '#ccc',
    borderWidth: 1,
    borderColor: '#444'
  },
  buttonText: {
    fontSize: 16,
    color: '#ffffff',
    fontWeight: '500',
  },
  title: {
    fontSize: 16,
    fontWeight: '500',
    color: '#2c3e50',
  },
  price: {
    fontSize: 16,
    fontWeight: '500',
    color: '#34495e',
  },
  priceTime: {
      fontSize: 16,
      fontWeight: '500',
      color: '#34495e',
      backgroundColor: '#eee',
      paddingHorizontal: 10,
      paddingVertical: 10,
    },
  spacer: {
    height: 20,
  },
});
