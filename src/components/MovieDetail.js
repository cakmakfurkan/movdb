/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import axios from 'axios';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';

class DetailScreen extends Component {
  constructor(props) {
    super(props);
    this.favMovies = null;
    this.state = {
      movieID: this.props.navigation.getParam('movieID', 'default value'),
      movieDetail: {
        backdrop_path: null,
        title: null,
        original_language: null,
        release_date: null,
        budget: 0,
        overview: null,
        status: null,
        vote_average: 0,
        vote_count: 0,
        isFaved: false,
      },
    };
    this.imageBase = 'https://image.tmdb.org/t/p/w1066_and_h600_bestv2';
  }

  setMovieID = movieID => {
    this.setState({
      movieID: movieID,
    });
  };

  setMovieDetail = detail => {
    this.setState({
      movieDetail: detail,
    });
  };

  setIsFaved = state => {
    this.setState({
      isFaved: state,
    });
  };

  storeData = async value => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem('favMovies', jsonValue);
    } catch (e) {
      console.log('async storage error');
    }
  };

  getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('favMovies');
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      console.log('async storage error');
    }
  };

  onBackPressed = () => {
    this.props.navigation.navigate('Main');
  };

  getMovieDetail = movieID => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${movieID}?api_key=02a332d8f3e7c3aee762f4df926c1a2f&language=tr-TR`,
      )
      .then(movie => {
        this.setMovieDetail(movie.data);
        console.log(movie.data);
        this.setIsFaved(this.isFaved(this.favMovies.idList));
      })
      .catch(err => {
        console.log(err);
      });
  };

  isFaved = array => {
    return array.includes(this.state.movieID);
  };

  favMovie = movieID => {
    this.favMovies.idList.push(movieID);
    this.storeData(this.favMovies);
    this.setIsFaved(true);
  };

  unfavMovie = movieID => {
    const index = this.favMovies.idList.indexOf(movieID);
    if (index > -1) {
      this.favMovies.idList.splice(index, 1);
    }
    this.storeData(this.favMovies);
    this.setIsFaved(false);
  };

  componentDidMount() {
    this.getMovieDetail(this.state.movieID);
    this.getData()
      .then(data => {
        if (data) {
          this.favMovies = data;
        } else {
          this.favMovies = {idList: []};
        }
      })
      .catch(err => console.log(err));
  }

  render() {
    var {movieDetail} = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate('Main');
            }}>
            <Icon name="chevron-left" size={30} color="white" />
          </TouchableOpacity>
          <Text numberOfLines={1} adjustsFontSizeToFit style={styles.title}>
            {movieDetail.title}
          </Text>
          <TouchableOpacity
            onPress={() => {
              console.log(this.favMovies);
              this.state.isFaved
                ? this.unfavMovie(this.state.movieID)
                : this.favMovie(this.state.movieID);
            }}>
            <Icon
              name={!this.state.isFaved ? 'heart-o' : 'heart'}
              size={30}
              color="white"
            />
          </TouchableOpacity>
        </View>
        <View style={styles.curve}>
          <Image
            style={styles.backgroundImage}
            source={{uri: this.imageBase + movieDetail.backdrop_path}}
          />
        </View>
        <ScrollView style={{padding: 20}}>
          <Text style={styles.textStyle}>
            Çıkış Tarihi: {this.state.movieDetail.release_date} {'      '} Dil:{' '}
            {this.state.movieDetail.original_language}
          </Text>
          <Text style={styles.textStyle}>
            Bütçe: ${this.state.movieDetail.budget}
          </Text>
          <Text style={styles.textStyle}>
            Durumu: {this.state.movieDetail.status}
          </Text>
          <Text style={styles.textStyle}>
            Puan: {this.state.movieDetail.vote_count} oyda{' '}
            {this.state.movieDetail.vote_average}
          </Text>
          <Text style={[styles.textStyle, {fontSize: 30}]}>Özet</Text>
          <Text style={styles.textStyle}>
            {this.state.movieDetail.overview}
          </Text>
          <View style={{height: 40, width: '100%'}} />
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e3dbdb',
  },
  header: {
    width: '100%',
    height: '11%',
    backgroundColor: '#0394fc',
    justifyContent: 'space-between',
    paddingHorizontal: '5%',
    paddingTop: '8%',
    flexDirection: 'row',
  },
  title: {
    color: 'white',
    fontSize: 20,
    fontWeight: '600',
  },
  backgroundImage: {
    flex: 1,
    transform: [{scaleX: 0.5}],
  },
  curve: {
    height: '35%',
    width: '100%',
    transform: [{scaleX: 2}],
    borderBottomStartRadius: 1000,
    borderBottomEndRadius: 1000,
    overflow: 'hidden',
  },
  textStyle: {
    fontWeight: '500',
    fontSize: 20,
    color: 'black',
    marginBottom: '2%',
    textAlign: 'center',
  },
});

export default DetailScreen;
