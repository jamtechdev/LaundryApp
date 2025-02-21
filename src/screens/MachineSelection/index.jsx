import React, { useState } from 'react';
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

const { width } = Dimensions.get('window');

const MachineSelection = ({ navigation }) => {
  const { appliancesValue, setMachineValue } = useAppContext();
  const [machines, setMachines] = useState([
    { id: 1, capacity: '15/11kg', icon: '1️⃣' },
    { id: 2, capacity: '27/15kg', icon: '2️⃣' },
    { id: 3, capacity: '27/15kg', icon: '3️⃣' },
  ]);

  const handleMachinesClick = (item) => {
    setMachines(machines.map(machine => ({
      ...machine,
      selected: machine.id === item.id,
    })));
    setMachineValue(item);
    navigation.navigate(RouteName.Course_Selection);
  };

  return (
    <View style={styles.container}>
      {/* Selected Appliance Info */}
      <View style={styles.selectedStyle}>
        <Text style={styles.selectedText}>
          {appliancesValue.icon} {appliancesValue.name}
        </Text>
      </View>

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>{StringConst.machineSelection}</Text>
      </View>

      {/* Machine Selection */}
      <View style={styles.applianceContainer}>
        {machines.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={[
              styles.fullWidthButton,
              styles.selectedButton,
            ]}
            onPress={() => handleMachinesClick(item)}
          >
            <Text style={[styles.buttonText, styles.selectedText]}>
              {item.icon} {item.capacity}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Action Buttons at Bottom */}
      <ActionButtons />
    </View>
  );
};

export default MachineSelection;

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
  },
  fullWidthButton: {
    width: '100%',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 15,
  },
  selectedButton: {
    backgroundColor: '#2ecc71',
    borderWidth: 2,
    borderColor: '#2ecc71',
  },
  unselectedButton: {
    backgroundColor: '#f0f0f0',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
});
