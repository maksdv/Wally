
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  article: {
    flex: 0.8,
    backgroundColor: 'white',
    borderRadius: 6,
    marginHorizontal: 16,
    marginVertical: 2,
    paddingHorizontal: 8,
    paddingVertical: 6,
    shadowColor: 'white',
    shadowOpacity: 0.5,
    shadowRadius: 1,
    shadowOffset: {
      height: 1,
    },
  },
});
class InfoArticle extends PureComponent {
  render() {
    const { article } = this.props;
    return (
      <View key={article.id} style={styles.container}>
        <View style={[styles.article, styles.article]}>
          <Text style={[styles.article]}>{article.name}</Text>
          <Text>{article.description}</Text>
        </View>
      </View>
    );
  }
}
InfoArticle.propTypes = {
  article: PropTypes.shape({
    description: PropTypes.string.isRequired,
  }).isRequired,
};
export default InfoArticle;
