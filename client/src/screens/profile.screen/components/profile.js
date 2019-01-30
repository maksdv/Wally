import {
  StyleSheet, View, Text, TouchableHighlight, Image, FlatList,
} from 'react-native';
import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import PropTypes from 'prop-types';
import PFP from '../../../images/perfil.jpeg';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#dce0e8',
  },
  articleContainer: {
    height: 130,
    width: '90%',
    marginTop: 200,
    
  },
  userImage: {
    width: 200,
    height: 130,
    marginTop: 10,
    borderWidth: 2,
    borderColor: 'grey',
    borderRadius: 30,
    alignSelf: 'center',
  },
  articImage: {
    width: 60,
    height: 60,
    alignSelf:'center',
    borderColor: 'grey',
    borderRadius: 30,
  },
  uName: {
    alignSelf: 'center',
    fontWeight: 'bold',
    borderBottomWidth: 0.5,
    fontSize: 20,
    marginTop: 10,
    color: '#02c8ef',
  },
  articlesSelling: {
    margin: 10,
    flexDirection: 'row',
  },
  num: {
    fontSize: 34,
    marginStart: 10,
  },
});

const Article = ({ goToInfoArticle,  article: { id, name, image } }) => (
  <TouchableHighlight key={id} onPress={goToInfoArticle} underlayColor="transparent">
    <View style={styles.articleContainer}>
      <Image style={styles.articImage} source={{ uri: image }} />
      
    </View>
  </TouchableHighlight>
);

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  goToInfoArticle = article => () => {
    const {
      navigation: { navigate },
    } = this.props;
    navigate('InfoArticle', { id: article.id, title: article.name, articleDescr: article.description, names: article.owner.username });
  };

  keyExtractor = item => item.id.toString();

  renderItem = ({ item }) => <Article article={item} goToInfoArticle={this.goToInfoArticle(item)} />;

  render() {
    const { user } = this.props;
    return (
      <View style={styles.container}>
        <Image
          style={styles.userImage}
          source={PFP}
        />
        <Text style={styles.uName}>{user.username}</Text>
        <Text style={styles.uName}>{user.email}</Text>
        <View style={styles.artics}>
          <FlatList data={user.articles} horizontal keyExtractor={this.keyExtractor} renderItem={this.renderItem} />
        </View>
      </View>

      
    );
  }
}

export default Profile;
