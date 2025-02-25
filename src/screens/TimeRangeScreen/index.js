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
import { useAppContext } from '../../_context/AppProvider';
import ActionButtons from '../../components/ActionButtons';
import FooterText from '../../components/FooterText';
import Colors from '../../utils/Colors';

const { width } = Dimensions.get('window');

const TimeRangeSelection = ({ navigation }) => {
  const {
    appliancesValue,
    machineValue,
    courseValue,
    timeRangeValue,
    setTimeRangeValue,
  } = useAppContext();

  // Sample time range data
  const timeRangeOptions = [
    {
      id: 1,
      title: '10-60 ' + StringConst.minutes,
      price: '700 ' + StringConst.yen + StringConst.to + '800 ' + StringConst.yen,
    },
    {
      id: 2,
      title: '70-120 ' + StringConst.minutes,
      price: '800 ' + StringConst.yen + StringConst.to + '900 ' + StringConst.yen,
    },
    {
      id: 3,
      title: '130-180 ' + StringConst.minutes,
      price: '1000 ' + StringConst.yen + StringConst.to + '1100 ' + StringConst.yen,
    },
  ];

  const handleTimeRangeClick = (option) => {
    setTimeRangeValue(option);
    navigation.navigate(RouteName.Using_Time_Selection);
  };

  return (
    <View style={styles.container}>
      {/* Selected Appliances & Machines */}
      <View style={styles.selectedStyle}>
        <View style={styles.selectedRow}>
          <Text style={styles.selectedText}>{appliancesValue?.name}</Text>
          <Text style={styles.selectedText}>
            {machineValue?.icon} {machineValue?.capacity}
          </Text>
        </View>
        <View style={styles.courseBox}>
          <Text style={styles.selectedText}>{courseValue?.title}</Text>
        </View>
      </View>

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>{StringConst.timeRangeHeading}</Text>
      </View>

      {/* Time Range Options */}
      <View style={styles.applianceContainer}>
        {timeRangeOptions.map((option) => (
          <TouchableOpacity
            key={option.id}
            style={[
              styles.fullWidthButton,
              timeRangeValue?.id === option.id
                ? styles.tertiaryButton
                : styles.secondaryButton,
            ]}
            onPress={() => handleTimeRangeClick(option)}
          >
            <View style={styles.textContainer}>
              <Text style={styles.title}>{option.title}</Text>
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

export default TimeRangeSelection;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 20,
    alignItems: 'center',
    backgroundColor: '#FFFFFF', // White background
    paddingHorizontal: 15,
  },
  selectedStyle: {
    width: '100%',
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
    color: '#000', // Black text
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
    color: '#000', // Black text
    textAlign: 'center',
  },
  applianceContainer: {
    width: '100%',
    alignItems: 'center',
    marginTop: 10,
  },
  fullWidthButton: {
    width: '100%',
    paddingVertical: 18,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
  },
  secondaryButton: {
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: Colors.primary,
  },
  tertiaryButton: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: Colors.secondary,
  },
  textContainer: {
    flex: 1,
  },
  detailsContainer: {
    alignItems: 'flex-end',
  },
  title: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000', // Black text
  },
  price: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000', // Black text
  },
  spacer: {
    height: 20,
  },
});
