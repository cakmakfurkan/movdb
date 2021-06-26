import React from 'react';
import Router from './src/Router';
import {StyleSheet, View} from 'react-native';

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.MainArea}>
        <Router />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  MainArea: {
    flex: 1,
    backgroundColor: '#f2f2f2',
    justifyContent: 'center',
  },
});
