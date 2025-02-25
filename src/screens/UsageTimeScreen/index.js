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

const UsageTimeScreen = ({ navigation }) => {
  const {
    machineValue,
    appliancesValue,
    courseValue,
    usingTimeValue,
    setUsingTimeValue,
  } = useAppContext();

  // Example data for usage time/cost selection
  const usageTimes = [
    {
      id: 1,
      time: '10 ' + StringConst.min,
      price: '100 ' + StringConst.yen,
      selected: false,
    },
    {
      id: 2,
      time: '20 ' + StringConst.min,
      price: '200 ' + StringConst.yen,
      selected: false,
    },
    {
      id: 3,
      time: '30 ' + StringConst.min,
      price: '300 ' + StringConst.yen,
      selected: false,
    },
    {
      id: 4,
      time: '40 ' + StringConst.min,
      price: '400 ' + StringConst.yen,
      selected: false,
    },
    {
      id: 5,
      time: '50 ' + StringConst.min,
      price: '500 ' + StringConst.yen,
      selected: false,
    },
    {
      id: 6,
      time: '60 ' + StringConst.min,
      price: '600 ' + StringConst.yen,
      selected: false,
    },
  ];

  const handleUsingTimClick = (option) => {
    setUsingTimeValue(option);
    navigation.navigate(RouteName.Payment_Selection);
  };

  const renderUsingTimeItem = ({ item }) => {
    return (
      <TouchableOpacity
        style={[
          styles.fullWidthButton,
          item.id === usingTimeValue?.id
            ? styles.tertiaryButton
            : styles.secondaryButton,
        ]}
        onPress={() => handleUsingTimClick(item)}
      >
        <View style={styles.textContainer}>
          <Text style={styles.titleBox}>{item.time}</Text>
          <Text style={styles.title}>{item.price}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {/* Selected Machine Info */}
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

      {/* Header Text */}
      <View style={styles.header}>
        <Text style={styles.headerText}>{StringConst.usingTimeHeading}</Text>
      </View>

      <FlatList
        data={usageTimes}
        keyExtractor={(item) => item.id.toString()}
        numColumns={3}
        columnWrapperStyle={styles.columnWrapper}
        contentContainerStyle={styles.applianceContainer}
        renderItem={renderUsingTimeItem}
      />

      <View style={styles.spacer} />
      <ActionButtons />
      <FooterText />
    </View>
  );
};

export default UsageTimeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 20,
    alignItems: 'center',
    backgroundColor: '#FFFFFF', // white background
    paddingHorizontal: 15,
  },
  selectedStyle: {
    width: '100%',
    paddingVertical: 25,
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 20,
    backgroundColor: Colors.bg, // using custom bg color
  },
  applianceContainer: {
    paddingBottom: 20,
  },
  columnWrapper: {
    justifyContent: 'space-between',
    marginBottom: 15,
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
    color: '#000', // black text
    textAlign: 'center',
  },
  fullWidthButton: {
    paddingVertical: 13,
    borderRadius: 10,
    marginBottom: 10,
    paddingHorizontal: 10,
    flexWrap: 'wrap',
    marginHorizontal: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondaryButton: {
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: Colors.primary, // using secondary color for border
  },
  tertiaryButton: {
    backgroundColor: '#FFF',
    borderWidth: 2,
    borderColor: Colors.primary, // black border for selected state
  },
  textContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000', // black text
    flexWrap: 'wrap',
    width: 40,
    textAlign: 'center',
  },
  titleBox: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000', // black text
    flexWrap: 'wrap',
    width: 40,
    backgroundColor: Colors.bg,
    marginRight: 7,
    paddingHorizontal: 5,
    paddingVertical: 5,
    textAlign: 'center',
  },
  spacer: {
    height: 20,
  },
});
