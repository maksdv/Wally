import R from 'ramda';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import {
  FlatList, StyleSheet, Text, TouchableHighlight, View, ActivityIndicator,
} from 'react-native';

import { graphql } from 'react-apollo';
import { USER_QUERY } from '../graphql/user.query';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
  articleContainer: {
    flex: 1,
    flexDirection: 'row',
    width: 170,
    height: 170,
    margin: 5,
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: '#c3d0e5',
    borderColor: 'grey',
  },
  articleName: {
    fontWeight: 'bold',
    flex: 0.7,
  },
  loading: {
    justifyContent: 'center',
    flex: 1,
  },
});
// create fake data to populate our ListView
const fakeData = () => R.times(
  i => ({
    id: i,
    name: `Articlee ${i}`,
  }),
  40,
);

const Article = ({ goToInfoArticle, article: { id, name } }) => (
  <TouchableHighlight key={id} onPress={goToInfoArticle}>
    <View style={styles.articleContainer}>
      <Text style={styles.articleName}>{name}</Text>
    </View>
  </TouchableHighlight>
);
Article.propTypes = {
  goToInfoArticle: PropTypes.func.isRequired,
  article: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    description: PropTypes.string,
  }),
};
class Articles extends Component {
  static navigationOptions = {
    title: 'Articulos',
  };

  keyExtractor = item => item.id.toString();

  goToInfoArticle = article => () => {
    const {
      navigation: { navigate },
    } = this.props;
    navigate('Articles', { ArticleId: article.id, title: article.name, articleDescr: article.description });
  };

  renderItem = ({ item }) => <Article article={item} goToInfoArticle={this.goToInfoArticle(item)} />;

  render() {
    const { loading, user } = this.props;
    if (loading || !user) {
      return (
        <View style={[styles.loading, styles.container]}>
          <ActivityIndicator />
        </View>
      );
    }
    return (
      <View style={styles.container}>
        <FlatList data={fakeData()} numColumns={2} keyExtractor={this.keyExtractor} renderItem={this.renderItem} />
      </View>
    );
  }
}

Articles.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }),
  loading: PropTypes.bool,
  user: PropTypes.shape({
    id: PropTypes.number.isRequired,
    email: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    articles: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
      }),
    ),
  }),
};


export default Articles;
