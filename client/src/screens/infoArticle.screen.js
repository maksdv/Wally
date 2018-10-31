import R from 'ramda';
import { FlatList, StyleSheet, View } from 'react-native';
import React, { Component } from 'react';

import InfoArticle from '../components/infoArticle.component';


const styles = StyleSheet.create({
  container: {
    alignItems: 'stretch',
    backgroundColor: '#e5ddd5',
    flex: 1,
    flexDirection: 'column',
  },
});
const fakeData = () => R.times(
  i => ({
    article: {
      id: i,
      name: `nombre article ${i}`,
      description: `Description artiCULO ${i}`,
    },
  }),
  40,
);
class InfoArticles extends Component {
  static navigationOptions = ({ navigation }) => {
    const { state } = navigation;
    return {
      title: state.params,
    };
  };

   keyExtractor = item => item.article.id.toString();

   renderItem = ({ item: { article } }) => (
     <InfoArticle article={article} />
   );

   render() {
     // render list of messages for group
     return (
       <View style={styles.container}>
         <FlatList
           data={fakeData()}
           keyExtractor={this.keyExtractor}
           renderItem={this.renderItem}
           ListEmptyComponent={<View />}
         />
       </View>
     );
   }
}
export default InfoArticles;
