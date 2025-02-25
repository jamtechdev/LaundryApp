import React from 'react';
import { View, Text, TouchableOpacity, Alert, StyleSheet, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import RouteName from '../utils/Constant';
import StringConst from '../utils/StringConstant';
import { Colors } from 'react-native/Libraries/NewAppScreen';

const { width, height } = Dimensions.get('window');

const ActionButtons = () => {
  const navigation = useNavigation();

  // Handle cancel button with confirmation
  const handleCancel = () => {
    Alert.alert(
      "Confirmation",
      "Are you sure you want to cancel?",
      [
        { text: "No", style: "cancel" },
        { text: "Yes", onPress: () => navigation.navigate(RouteName.Appliance_Screen) }
      ]
    );
  };

  return (
    <View style={styles.buttonContainer}>
      <TouchableOpacity style={styles.returnButton} onPress={() => navigation.goBack()}>
        <Text style={styles.buttonText}>⬅ </Text>
        <Text style={styles.buttonText}>{StringConst.return} </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
        <Text style={styles.buttonTextX}>X</Text>
        <Text style={styles.buttonTextCancel}>{StringConst.cancel}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ActionButtons;

const styles = StyleSheet.create({
  buttonContainer: {
    position: 'absolute',
    bottom: 55, // Fix at the bottom
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 25,
    backgroundColor: '#fff',
    width: width, // Ensure full width
  },
  returnButton: {
    flex: 1,
    backgroundColor: Colors.primary,
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    marginRight: 10,
    borderColor: Colors.primary,
    borderWidth: 1,
    flexDirection: 'row',
    width: '80%',
    justifyContent: 'space-between'
  },
  cancelButton: {
    flex: 1,
    backgroundColor: '#fff',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    marginRight: 10,
    borderColor: '#444',
    borderWidth: 1,
    flexDirection: 'row',
    width: '80%',
    justifyContent: 'space-between'
  },
  buttonText: {
    fontSize: 16,
    color: '#fff',
  },
  buttonTextCancel: {
    fontSize: 16,
    color: '#000',
  },
  buttonTextX:{
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 5,
    fontWeight: 'bold'
  }
});
