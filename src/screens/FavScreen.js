/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {Text, View, StyleSheet, ScrollView} from 'react-native';
import axios from 'axios';
import MovieList from '../components/MovieList';
import Header from '../components/Header';
import NavBar from '../components/NavBar';
import AsyncStorage from '@react-native-async-storage/async-storage';

class FavScreen extends Component {
  constructor(props) {
    super(props);
    this.favMovies = null;
    this.state = {
      movieList: [],
      page: 1,
      totalPages: 100,
      totalResults: 100,
    };
  }

  getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('favMovies');
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      console.log('async storage error');
    }
  };

  setMovieList = movieList => {
    this.setState({
      movieList: movieList,
    });
  };

  addMovieList = movie => {
    this.setState({
      movieList: [...this.state.movieList, movie],
    });
  };

  setPage = pageNumber => {
    this.setState({
      page: pageNumber,
    });
  };

  setTotalPages = totalPages => {
    this.setState({
      totalPages: totalPages,
    });
  };

  setTotalResults = totalResults => {
    this.setState({
      totalResults: totalResults,
    });
  };

  onNextPressed = () => {
    if (this.state.page < this.state.totalPages) {
      this.setMovieList([]);
      this.getMovies(this.state.page + 1);
      this.setPage(this.state.page++);
    }
  };

  onBackPressed = () => {
    if (this.state.page > 1) {
      this.setMovieList([]);
      this.getMovies(this.state.page - 1);
      this.setPage(this.state.page--);
    }
  };

  getMovies = async pageNumber => {
    if (pageNumber <= Math.floor(this.favMovies.idList.length / 10)) {
      for (var i = (pageNumber - 1) * 10; i < pageNumber * 10; i++) {
        var id = this.favMovies.idList[i];
        console.log(id);
        await axios
          .get(
            `https://api.themoviedb.org/3/movie/${id}?api_key=02a332d8f3e7c3aee762f4df926c1a2f&language=tr-TR`,
          )
          .then(movies => {
            this.addMovieList(movies.data);
            this.setPage(pageNumber);
            console.log(movies.data);
          })
          .catch(err => {
            console.log(err);
          });
      }
    } else {
      for (
        var i = (pageNumber - 1) * 10;
        i < this.favMovies.idList.length;
        i++
      ) {
        var id = this.favMovies.idList[i];
        console.log(id);
        await axios
          .get(
            `https://api.themoviedb.org/3/movie/${id}?api_key=02a332d8f3e7c3aee762f4df926c1a2f&language=tr-TR`,
          )
          .then(movies => {
            this.addMovieList(movies.data);
            this.setPage(pageNumber);
            console.log(movies.data);
          })
          .catch(err => {
            console.log(err);
          });
      }
    }
  };

  componentDidMount() {
    this.getData()
      .then(data => {
        if (data) {
          this.favMovies = data;
        } else {
          this.favMovies = {idList: []};
        }
        console.log(this.favMovies);
        this.setTotalPages(Math.ceil(this.favMovies.idList.length / 10));
        this.getMovies(1);
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <View style={{justifyContent: 'space-between'}}>
        <Header />
        <MovieList children={this.state.movieList} />
        <NavBar
          onBackPressed={this.onBackPressed.bind(this)}
          onNextPressed={this.onNextPressed.bind(this)}
          maxPage={this.state.totalPages}
          currentPage={this.state.page}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {},
});

export default FavScreen;
