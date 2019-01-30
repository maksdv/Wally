
import PropTypes from 'prop-types';
import React from 'react';
import {
  StyleSheet, Text, TouchableHighlight, View, Image,
} from 'react-native';

const styles = StyleSheet.create({

  articleContainer: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    paddingHorizontal: 3,
    paddingVertical: 5,
    marginStart: '4.5%',
    marginBottom: 3,
  },
  input: {
    marginStart: '10%',
    width: '80%',
    height: 40,
    borderWidth: 0.3,
    borderColor: 'grey',
    borderRadius: 10,
    margin: 2,
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
  articleImage: {
    width: 150,
    height: 150,
    borderRadius: 10,
  },
});
const strReduce = (s, n) => s.substring(0, Math.min(s.length, n));
const dotIt = (s,n) => (s.length > n) ? s+'...' : s;
const Article = ({
  goToInfoArticle, article: {
    id, name, price, image,
  },
}) => (
  <TouchableHighlight key={id} onPress={goToInfoArticle} underlayColor="transparent">
    <View style={styles.articleContainer}>
      <Image style={styles.articleImage} source={{ uri: image }} />
      <Text style={styles.articleName}>
        {dotIt(strReduce(name, 18), 17)}
      </Text>
      <Text style={styles.price}>
        {price}
          $
      </Text>
    </View>
  </TouchableHighlight>
);

Article.propTypes = {
  goToInfoArticle: PropTypes.func.isRequired,
  article: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    price: PropTypes.number,
    image: PropTypes.string,
    description: PropTypes.string,
  }),
};

export default Article;
