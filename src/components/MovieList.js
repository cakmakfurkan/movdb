import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, View, FlatList} from 'react-native';
import MovieCard from './MovieCard';

/*const Item = ({id, imagePath, title, releaseDate, voteAverage}) => (
  <MovieCard
    id={id}
    imagePath={imagePath}
    title={title}
    releaseDate={releaseDate}
    voteAverage={voteAverage}
  />
);*/

const FoodList = props => {
  FoodList.propTypes = {
    children: PropTypes.array,
  };

  const renderItem = ({item}) => (
    <MovieCard
      id={item.id}
      imagePath={item.poster_path}
      title={item.title}
      releaseDate={item.release_date}
      voteAverage={item.vote_average}
    />
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={props.children}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        numColumns={2}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 60,
    height: '79%',
  },
});

export default FoodList;

/*
<FlatList
    showsHorizontalScrollIndicator={true}
    style={styles.categoriesView}
    data={props.childrens}
    renderItem={renderItem}
    keyExtractor={item => item.header}
/>
*/
