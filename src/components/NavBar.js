import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {withNavigation} from 'react-navigation';

const NavBar = props => {
  NavBar.propTypes = {
    maxPage: PropTypes.number,
    currentPage: PropTypes.number,
    onBackPressed: PropTypes.func,
    onNextPressed: PropTypes.func,
  };

  return (
    <View style={styles.navbar}>
      <TouchableOpacity
        onPress={() => {
          props.navigation.navigate('Main');
        }}>
        <Icon name="home" size={30} color="white" />
      </TouchableOpacity>
      <TouchableOpacity onPress={props.onBackPressed}>
        <Icon name="chevron-left" size={30} color="white" />
      </TouchableOpacity>
      <Text style={styles.pageText}>
        {props.currentPage} - {props.maxPage}
      </Text>
      <TouchableOpacity onPress={props.onNextPressed}>
        <Icon name="chevron-right" size={30} color="white" />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          props.navigation.navigate('Fav');
        }}>
        <Icon name="heart" size={30} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  navbar: {
    height: '9%',
    width: '100%',
    backgroundColor: '#0394fc',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignSelf: 'flex-end',
    marginTop: '-16%',
    paddingHorizontal: '10%',
  },
  pageText: {
    fontWeight: '400',
    fontSize: 15,
    color: 'white',
  },
});

export default withNavigation(NavBar);
