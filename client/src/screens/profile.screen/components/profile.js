import {
  StyleSheet, View, Text, TouchableHighlight, Image, FlatList, Button, ImageBackground
} from 'react-native';
import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import PropTypes from 'prop-types';
import { logout } from '../../../actions/auth.actions';
import PFP from '../../../images/perfil.jpeg';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000'
  },
  headerBackground: {
    flex: 1,
    width: null,
    alignSelf: 'stretch',
  },
  header: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: 'rgba(0,0,0,0.5)'
  },
  profileContainer: {
    width: 170,
    height: 170,
    borderRadius: 100,
    borderColor: 'rgba(0,0,0,0.4)',
    borderWidth: 16,
  },
  profile: {
    flex: 1,
    width: null,
    alignSelf: 'stretch',
    borderRadius: 100,
    borderColor: '#fff',
    borderWidth: 4,
  },
  name: {
    marginTop: 20,
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
  articleContainer: {
    margin: 10,
    flexDirection: 'row',
  },
  articleSeparator:{
    borderRightWidth: 4,
  },
  articImage: {
    padding: 10,
    alignSelf:'center',
    width: 120,
    height: 120,
  },
});

const Article = ({ goToInfoArticle,  article: { id, name, image } }) => (
  <TouchableHighlight key={id} onPress={goToInfoArticle} underlayColor="transparent">
    <View style={styles.articleSeparator}>
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

  goToEditProfile = () => {
    const {
      navigation: { navigate },
      user
    } = this.props;
    navigate('EditProfile', {
      userId: user.id,
    });
  };

  logout = () => {
    const {
      dispatch,
      navigation: { navigate },
    } = this.props;
    dispatch(logout());
    navigate('Auth');
  };

  keyExtractor = item => item.id.toString();

  renderItem = ({ item }) => <Article article={item} goToInfoArticle={this.goToInfoArticle(item)} />;

  render() {
    const { user } = this.props;
    if (!user) {
      return <View />;
    }

    return (
      <View style={styles.container}>
        <ImageBackground style={styles.headerBackground} source={require('../../../images/fondo.jpg')}>
        <View style={styles.header}>
          <View style={styles.profileContainer}>
            <Image style={styles.profile} source={PFP}/>
          </View>
            <Text style={styles.name}>{user.username}</Text> 
            <Text style={styles.name}>{user.email}</Text>
            <Icon name="ios-create" style={styles.name} size={20} onPress={this.goToEditProfile} />
          <View style={styles.articleContainer}>
            <FlatList data={user.articles} horizontal keyExtractor={this.keyExtractor} renderItem={this.renderItem} />
          </View>
          <View>
            <Button title="Logout" onPress={ this.logout }/>
          </View>
          
        </View>
        </ImageBackground>
      </View> 
    );
  }
}

export default Profile;

