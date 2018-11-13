import PropTypes from 'prop-types';
import React, { Component } from 'react';
import {
  FlatList, StyleSheet, Text, TouchableHighlight, View, ActivityIndicator, Image
} from 'react-native';
import AddButton from '../components/addButton';
import { graphql, compose } from 'react-apollo';
import { USER_QUERY } from '../graphql/user.query';
import { ARTICLES_QUERY } from '../graphql/articles.query';


const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
  articleContainer: {
    flex: 1,
    width: 160,
    height: 180,
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderColor: '#eee',
    borderWidth: 1.75,
    borderBottomColor: '#DDD',
    borderBottomWidth: 3.0,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 5,
    margin: 10,
  },
  price: {
    width: '50%',
    color: '#EF4413',
    backgroundColor: 'rgba(255,255,255,0.72)',
    alignContent: 'center',
    textAlign: 'center',
    fontSize: 15,
    fontWeight: 'bold',
    position: 'absolute',
    top: 10,
    borderRadius: 10,
  },
  loading: {
    justifyContent: 'center',
    flex: 1,
  },
  userImage: {
    width: 150,
    height: 135,
    borderRadius: 10,
  },
});

const Article = ({ goToInfoArticle, article: { id, name, price, image } }) => (
  <TouchableHighlight key={id} onPress={goToInfoArticle} underlayColor='transparent'>
    <View style={styles.articleContainer}>

      <Image style={styles.userImage} source={{ uri: image }} />
      <Text style={styles.articleName}>{name}</Text>
      <Text style={styles.price}>{price+'$'}</Text>
    </View>
  </TouchableHighlight>
);

Article.propTypes = {
  goToInfoArticle: PropTypes.func.isRequired,
  article: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    price: PropTypes.number,
    image: PropTypes.string.isRequired,
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
    navigate('InfoArticles', { ArticleId: article.id, title: article.name, articleDescr: article.description });
  };

renderItem = ({ item }) => <Article article={item} goToInfoArticle={this.goToInfoArticle(item)} />;

render() {
  const { loading, articles } = this.props;
  if (loading) {
    return (
      <View style={[styles.loading, styles.container]}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList data={articles} numColumns={2} keyExtractor={this.keyExtractor} renderItem={this.renderItem} />
      <View><AddButton /></View>
    </View>
  );
}
}
Articles.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }),
  loading: PropTypes.bool,
  articles: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      image: PropTypes.string.isRequired,
      owner: PropTypes.shape({
        id: PropTypes.number,
        username: PropTypes.string,
      }),
    }),
  ),
};

const articlesquery = graphql(ARTICLES_QUERY, {
  options: () => ({}),
  props: ({ data: { loading, articles } }) => ({
    loading,
    articles: articles || [],
  }),
});

const userQuery = graphql(USER_QUERY, {
  options: () => ({ variables: { id: 1 } }), // fake the user for now
  props: ({ data: { loading, user } }) => ({
    loading,
    user,
  }),
});

export default compose(articlesquery)(Articles);
