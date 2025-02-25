import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  FlatList,
} from 'react-native';
import RouteName from '../../utils/Constant';
import StringConst from '../../utils/StringConstant';
import { useAppContext } from '../../_context/AppProvider';
import ActionButtons from '../../components/ActionButtons';
import FooterText from '../../components/FooterText';
import Colors from '../../utils/Colors';

const { width } = Dimensions.get('window');

const CourseSelection = ({ navigation }) => {
  const {
    appliancesValue,
    machineValue,
    setCourseValue,
    courseValue,
    courseList,
  } = useAppContext();

  const handleMachinesClick = (item, index)=> {
    if (item) {
      setCourseValue(item);
      if (index === 3) {
        navigation.navigate(RouteName.Time_Range_Selection);
      } else {
        navigation.navigate(RouteName.Payment_Selection);
      }
    }
  };

  return (
    <View style={styles.container}>
      {/* Selected Appliances & Machines */}
      <View style={styles.selectedStyle}>
        <View style={styles.selectedRow}>
          <Text style={styles.selectedText}>{appliancesValue.name}</Text>
          <Text style={styles.selectedText}>
            {machineValue.icon} {machineValue.capacity}
          </Text>
        </View>
      </View>

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>{StringConst.courseDesired}</Text>
      </View>

      <View style={styles.applianceContainer}>
        {courseList &&
          courseList.map((value, index) => {
            const option = {
              id: value.id,
              title: value.value.devicecourcename,
              time: value.value.operatingtime,
              price: value.value.fee,
            };
            return (
              <TouchableOpacity
                key={option.id}
                style={[
                  styles.fullWidthButton,
                  index == 3
                    ? styles.tertiaryButton
                    : styles.secondaryButton,
                ]}
                onPress={() => handleMachinesClick(option, index)}>
                <View style={styles.textContainer}>
                  <Text style={styles.title}>{option.title}</Text>
                </View>
                <View style={styles.detailsContainer}>
                  <Text style={styles.priceTime}>{option.time} mins</Text>
                </View>
                <View style={styles.detailsContainer}>
                  <Text style={styles.price}>¥{option.price} yen</Text>
                </View>
              </TouchableOpacity>
            );
          })}
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
    backgroundColor: '#FFFFFF',
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
    color: '#000', // Black text
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
  priceTime: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000', // Black text
    backgroundColor: Colors.bg,
    marginRight: 10,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  spacer: {
    height: 20,
  },
});
