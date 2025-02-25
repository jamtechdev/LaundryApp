import React, { useState } from 'react';
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
import Colors from '../../utils/Colors'; // Import your custom Colors

const { width } = Dimensions.get('window');

const MachineSelection = ({ navigation }) => {
  const { appliancesValue, setMachineValue } = useAppContext();
  const [machines, setMachines] = useState([
    { id: 1, capacity: '15/11' + StringConst.kg, icon: '1️⃣', selected: false },
    { id: 2, capacity: '27/15' + StringConst.kg, icon: '2️⃣', selected: false },
    { id: 3, capacity: '27/15' + StringConst.kg, icon: '3️⃣', selected: false },
  ]);

  const handleMachinesClick = (item) => {
    // Mark only the clicked machine as selected
    setMachines((prevMachines) =>
      prevMachines.map((machine) => ({
        ...machine,
        selected: machine.id === item.id,
      }))
    );
    // Store selected machine in context
    setMachineValue(item);
    // Navigate to next screen
    navigation.navigate(RouteName.Course_Selection);
  };

  const renderMachineItem = ({ item }) => {
    return (
      <TouchableOpacity
        style={[
          styles.gridItem,
          item.selected ? styles.selectedButton : styles.unselectedButton,
        ]}
        onPress={() => handleMachinesClick(item)}
      >
        <Text
          style={[
            styles.buttonText,
            item.selected && styles.selectedText,
          ]}
        >
          {item.icon} {item.capacity}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {/* Selected Appliance Info */}
      <View style={styles.selectedStyle}>
        <Text style={styles.selectedText}>
          {appliancesValue?.name}
        </Text>
      </View>

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>
          {StringConst.machineSelection}
        </Text>
      </View>

      {/* Machine Selection using FlatList */}
      <FlatList
        data={machines}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        columnWrapperStyle={styles.columnWrapper}
        contentContainerStyle={styles.applianceContainer}
        renderItem={renderMachineItem}
      />

      {/* Action Buttons at Bottom */}
      <ActionButtons />
      <FooterText />
    </View>
  );
};

export default MachineSelection;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 20,
    alignItems: 'center',
    backgroundColor: '#FFFFFF', // you can also use Colors.bg if desired
    paddingHorizontal: 15,
  },
  header: {
    marginTop: 20,
    marginBottom: 15,
    paddingVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 20,
    fontWeight: '400',
    color: '#444', // use primary color
    textAlign: 'center',
  },
  selectedStyle: {
    width: '100%',
    paddingVertical: 25,
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 20,
    backgroundColor: Colors.bg, // using custom bg color
  },
  selectedText: {
    fontSize: 18,
    fontWeight: '500',
    color: Colors.primary, // using primary for selected text
    textAlign: 'center',
  },
  applianceContainer: {
    paddingBottom: 20, // space under the last row
  },
  columnWrapper: {
    justifyContent: 'space-between',
    marginBottom: 15, // space between rows
  },
  gridItem: {
    width: '48%',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  selectedButton: {
    backgroundColor: '#FFF',
    borderWidth: 2,
    borderColor: Colors.primary, // use primary color for selected border
  },
  unselectedButton: {
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: Colors.primary, // use secondary color for unselected border
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '400',
    color: Colors.primary, // using primary color for text
  },
});
