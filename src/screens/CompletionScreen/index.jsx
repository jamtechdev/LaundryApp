import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import StringConst from '../../utils/StringConstant';
import RouteName from '../../utils/Constant';
import FooterText from '../../components/FooterText';
import Colors from '../../utils/Colors';

const CompletionScreen = ({ navigation }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace(RouteName.Appliance_Screen);
    }, 30000);

    return () => clearTimeout(timer); // Cleanup timer
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{StringConst.thankyouService}</Text>
      
      <TouchableOpacity 
        style={styles.button} 
        onPress={() => navigation.replace(RouteName.Appliance_Screen)}
      >
        <Text style={styles.buttonText}>{StringConst.completion}</Text>
      </TouchableOpacity>

      <Text style={styles.timerText}>
        {StringConst.completionNote} 30 {StringConst.seconds}
      </Text>
      
      <FooterText />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    backgroundColor: '#fff' 
  },
  title: { 
    fontSize: 18, 
    marginBottom: 30, 
    color: '#000', 
    textAlign: 'center' 
  },
  button: { 
    borderWidth: 1, 
    borderColor: Colors.primary, 
    paddingVertical: 12, 
    paddingHorizontal: 25, 
    borderRadius: 8, 
    margin: 15 
  },
  buttonText: { 
    fontSize: 16, 
    color: '#000' 
  },
  timerText: { 
    fontSize: 14, 
    color: '#000', 
    marginTop: 20 
  },
});

export default CompletionScreen;
