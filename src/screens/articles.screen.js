import R from 'ramda';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import {
  FlatList, StyleSheet, Text, TouchableHighlight, View,
} from 'react-native';


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
});
// create fake data to populate our ListView
const fakeData = () => R.times(
  i => ({
    id: i,
    name: `Article ${i}`,
  }),
  40,
);
const Article = ({ article: { id, name } }) => (
  <TouchableHighlight key={id}>
    <View style={styles.articleContainer}>
      <Text style={styles.articleName}>{`${name}`}</Text>
    </View>
  </TouchableHighlight>
);
Article.propTypes = {
  article: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
  }),
};
class Articles extends Component {
  static navigationOptions = {
    title: 'Articles',
  };

   keyExtractor = item => item.id.toString();

   renderItem = ({ item }) => <Article article={item} />;

   render() {
// render list of groups for user
     return (
       <View style={styles.container}>
         <FlatList data={fakeData()} numColumns={2} keyExtractor={this.keyExtractor} renderItem={this.renderItem} />
       </View>
     );
   }
}
export default Articles;
