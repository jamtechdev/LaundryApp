import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import StringConst from '../utils/StringConstant';

const FooterText = () => {
  return (
    <View style={styles.footerContainer}>
      <Text style={styles.footerText}>{StringConst.footerText}</Text>
    </View>
  );
};

export default FooterText;

const styles = StyleSheet.create({
  footerContainer: {
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
  },
  footerText: {
    fontSize: 12,
    color: '#000',
  },
});
