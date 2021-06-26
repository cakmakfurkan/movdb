/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {StyleSheet, View, Text} from 'react-native';

const Header = props => {
  return (
    <View style={styles.header}>
      <Text style={[styles.headerText, {color: 'white'}]}>Mov</Text>
      <Text style={[styles.headerText, {color: '#FFBF00'}]}>DB</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    height: '15%',
    width: '100%',
    backgroundColor: '#0394fc',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    flexDirection: 'row',
    marginTop: '-5%',
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 28,
    marginTop: '7%',
  },
});

export default Header;
