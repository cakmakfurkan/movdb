import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, Image, TouchableOpacity, View, Text} from 'react-native';
import {withNavigation} from 'react-navigation';

const MovieCard = props => {
  const imageBase = 'https://image.tmdb.org/t/p/w300';

  MovieCard.propTypes = {
    id: PropTypes.number,
    imagePath: PropTypes.string,
    title: PropTypes.string,
    releaseDate: PropTypes.string,
    voteAverage: PropTypes.number,
  };

  const onDetailPress = () => {
    props.navigation.navigate('Detail', {movieID: props.id});
  };

  return (
    <TouchableOpacity style={styles.card} onPress={onDetailPress}>
      <Image style={styles.image} source={{uri: imageBase + props.imagePath}} />
      <View style={styles.voteAverage}>
        <Text style={styles.voteText}>{props.voteAverage}</Text>
      </View>
      <View>
        <Text style={styles.title}>{props.title}</Text>
        <Text style={styles.releaseDate}>{props.releaseDate}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    height: 340,
    width: '45%',
    backgroundColor: 'white',
    alignSelf: 'center',
    borderRadius: 10,
    shadowOpacity: 0.5,
    shadowColor: 'grey',
    marginVertical: '3%',
    marginHorizontal: '2.5%',
  },
  title: {
    marginLeft: '4%',
    fontWeight: '800',
    fontSize: 17,
    textAlign: 'left',
  },
  releaseDate: {
    marginLeft: '4%',
    marginTop: '2%',
    fontSize: 14,
  },
  voteAverage: {
    marginTop: '-25%',
    marginLeft: '3%',
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 50,
    backgroundColor: 'rgba(14,28,33,1)',
  },
  voteText: {
    color: 'white',
    fontWeight: '800',
    fontSize: 17,
  },
  image: {
    height: '75%',
    width: '100%',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
});

export default withNavigation(MovieCard);
