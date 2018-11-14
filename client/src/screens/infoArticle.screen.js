import R from 'ramda';
import {
  FlatList, StyleSheet, View, Text, ActivityIndicator, Image,
} from 'react-native';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { graphql, compose } from 'react-apollo';
import { ARTICLE_QUERY } from '../graphql/articles.query';

const styles = StyleSheet.create({
  articleImage: {
    marginLeft: '2.5%',
    width: '95%',
    height: 350,
    borderRadius: 12,
  },
  container: {
    
  },
  article: {
    flex: 1,
    fontSize: 300,
  },
  nameArt: {
    fontSize: 25,
  },
  description: {
    fontSize: 15,
    margin: 5,
  },
  textCont: {
    alignItems: 'center',
  },
  priceStyle: {
    width: '50%',
    color: '#EF4413',
    alignContent: 'center',
    textAlign: 'center',
    fontSize: 25,
    fontWeight: 'bold',
    top: 10,
    borderRadius: 10,
  },
});


class InfoArticles extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: `${navigation.state.params.title}`,
  });

  constructor(props) {
    super(props);
    this.renderItem = this.renderItem.bind(this);
  }

  keyExtractor = item => item.article.id.toString();

   renderItem = ({ item: { article } }) => (
     <View style={styles.article}>
       <Text style={styles.article}>{article.name}</Text>
     </View>
   );

   render() {
     const { article, loading } = this.props;
     if (!article || loading) {
       return (
         <View style={[styles.loading, styles.container]}>
           <ActivityIndicator />
         </View>
       );
     }
     return (
       <View style={styles.container}>
         <FlatList
           data={article.title}
           keyExtractor={this.keyExtractor}
           renderItem={this.renderItem}
           ListEmptyComponent={<View />}
         />
         <View style={styles.textCont}>
           <Text style={styles.nameArt}>{article.name}</Text>
         </View>
         <View>
           <Image style={styles.articleImage} source={{ uri: article.image }} />
         </View>
         <View style={styles.textCont}>
           <Text style={styles.priceStyle}>
             {article.price}
             $
           </Text>
         </View>
         <View>
           <Text style={styles.description}>{article.description}</Text>
           <Text style={styles.priceStyle}>{article.owner.username}</Text>
         </View>
       </View>
     );
   }
}

InfoArticles.propTypes = {
  loading: PropTypes.bool,
  article: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    image: PropTypes.string,
    description: PropTypes.string,
    price: PropTypes.number,
    owner: PropTypes.shape({
      id: PropTypes.number,
      username: PropTypes.string,
    }),
  }),
  navigation: PropTypes.shape({
    dispatch: PropTypes.func,
    state: PropTypes.shape({
      params: PropTypes.shape({
        title: PropTypes.string,
        id: PropTypes.number,
      }),
    }),
  }),
};
const articleQuery = graphql(ARTICLE_QUERY, {
  options: ownProps => ({ variables: { id: ownProps.navigation.state.params.id } }),
  props: ({ data: { loading, article } }) => ({
    loading,
    article,
  }),
});

export default compose(articleQuery)(InfoArticles);
