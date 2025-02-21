import React from 'react';
import { View, Text, TouchableOpacity, Alert, StyleSheet, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import RouteName from '../utils/Constant';

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
        <Text style={styles.buttonText}>🔙 Return</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
        <Text style={styles.buttonText}>❌ Cancel</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ActionButtons;

const styles = StyleSheet.create({
  buttonContainer: {
    position: 'absolute',
    bottom: 15, // Fix at the bottom
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 25,
    backgroundColor: '#f8f9fa',
    borderTopWidth: 1,
    borderTopColor: '#d1d1d1',
    width: width, // Ensure full width
  },
  returnButton: {
    flex: 1,
    backgroundColor: '#3498db',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginRight: 10,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: '#e74c3c',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    color: '#ffffff',
    fontWeight: 'bold',
  },
});
