/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {Text, View, StyleSheet, ScrollView} from 'react-native';
import axios from 'axios';
import MovieList from '../components/MovieList';
import Header from '../components/Header';
import NavBar from '../components/NavBar';
class MainScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movieList: [],
      page: 1,
      totalPages: 100,
      totalResults: 100,
    };
  }

  setMovieList = movieList => {
    this.setState({
      movieList: movieList,
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
      this.getMovies(this.state.page + 1);
      this.setPage(this.state.page++);
    }
  };

  onBackPressed = () => {
    if (this.state.page > 1) {
      this.getMovies(this.state.page - 1);
      this.setPage(this.state.page--);
    }
  };

  getMovies = pageNumber => {
    axios
      .get(
        `https://api.themoviedb.org/3/trending/movie/week?api_key=02a332d8f3e7c3aee762f4df926c1a2f&language=tr-TR&page=${pageNumber}`,
      )
      .then(movies => {
        this.setMovieList(movies.data.results);
        this.setPage(movies.data.page);
        this.setTotalPages(movies.data.total_pages);
        this.setTotalResults(movies.data.total_results);
        console.log(movies.data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  componentDidMount() {
    this.getMovies(1);
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

export default MainScreen;
