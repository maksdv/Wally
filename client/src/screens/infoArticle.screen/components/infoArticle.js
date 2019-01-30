import {
  ScrollView,
  FlatList,
  TouchableHighlight,
  StyleSheet,
  View,
  TextInput,
  Alert,
  Button,
  Text,
  ActivityIndicator,
  Image,
} from 'react-native';
import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import Iconito from 'react-native-vector-icons/Entypo';
import PropTypes from 'prop-types';
import Geocoder from 'react-native-geocoding';
import Map from './mapComponent';

const styles = StyleSheet.create({
  articleImage: {
    marginLeft: '2.5%',
    width: '95%',
    height: 350,
    borderRadius: 12,
  },
  container: {
    backgroundColor: '#dce0e8'


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
    backgroundColor: '#dce0e8',
    borderRadius: 20,
  },
  textCont: {
    alignItems: 'center',
  },
  priceStyle: {
    margin: 2,
    width: '50%',
    color: '#000',
    alignContent: 'center',
    textAlign: 'center',
    fontSize: 25,
    fontWeight: 'bold',
    backgroundColor: '#FFD700',
    borderRadius: 10,
  },
  userName: {
    color: 'red',
    marginLeft: '30%',
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  buttonEdit: {

  },
  buttonDelete: {
    marginLeft: 30,
  },
  text: {
    marginTop: 6,
    color: 'black',
  
  },
  pin: {
    flex: 1, 
    flexDirection: 'row',
  },

});

const emptyData = data => data.some(item => item.length === 0);

class InfoArticle extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: `${navigation.state.params.title}`,
  });

  constructor(props, navigation) {
    super(props);
    this.renderItem = this.renderItem.bind(this);
    this.state = {
      editing: false,
      id: this.props.navigation.state.params.id,
      name: '',
      price: '',
      image: 'https://www.definicionabc.com/wp-content/uploads/Im%C3%A1gen-Vectorial.jpg',
      description: '',
      location: {
        lat: 0,
        lng: 0,
      },
    };
  }

  newName = (text) => {
    this.setState({
      name: text,
    });
  };


  newPrice = (text) => {
    this.setState({
      price: text,
    });
  };

  newDescription = (text) => {
    this.setState({
      description: text,
    });
  };

  keyExtractor = item => item.article.id.toString();

  renderItem = ({ item: { article } }) => (
    <View style={styles.article}>
      <Text style={styles.article}>{article.name}</Text>
    </View>
  );

  buildArticle = async () => {
    const {
      id, name, price, image, description,
    } = this.state;

    const { updateArticle, onChangeText, navigation } = this.props;
    let msg = 'Oooops something went wrong...';

    if (!emptyData([id, name, price, image, description])) {
      const updArti = await updateArticle({
        id, name, price, image, description,
      })
        .then(res => res.data.updateArticle)
        .catch(err => console.log(err));
      msg = `Yeah! ${updArti.name} has been updated!`;
      screenChange = onChangeText;
    }
    Alert.alert('Register', msg, [{ text: 'OK' }], {
      cancelable: false,
    });

    navigation.navigate('MyStore');
  };


  deleteArticle = async (id) => {
    const { deleteArticle, navigation } = this.props;
    await deleteArticle({ id });
    Alert.alert('Deleted');

    navigation.navigate('MyStore');
  }

  addChat = async (ownerId, buyerId, articleId) => {
    const { addChat, navigation, user } = this.props;
    const articleChat = user.chats.filter(x => x.from.id === articleId);// if we have

    if (articleChat.length) {
      navigation.navigate('Messages', { id: articleChat[0].id });
    } else {
      addChat({ ownerId, buyerId, articleId })
        .then((res) => {
          Alert.alert('Remember to be kind!');
          navigation.navigate('Messages', { id: res.data.addChat.id }); // Then recupera la respuesta de la mutacion
        });
    }
  }

  getCoords = () => {
    const { location } = this.state;
    const { article } = this.props;

    Geocoder.setApiKey('AIzaSyAXZx8pXwho5DZIT7HrDmTEenGW8SRwGV0');

    Geocoder.from(article.location).then(
      json => json.results[0].geometry.location,
    ).then((newLocation) => {
      if (true) {
        this.setState({ location: { lat: newLocation.lat, lng: newLocation.lng } });
      }
    }).catch(() => console.log('Mecaguen'));
  }


  render() {
    const {
      article, loading, navigation,
    } = this.props;
    const { editing, location } = this.state;
    const { lat, lng } = location;
    const titul = navigation.state.params.title;
    //  console.log(this.getCoords());

    if (!article || loading) {
      return (
        <View style={[styles.loading, styles.container]}>
          <ActivityIndicator />
        </View>
      );
    }
    
    this.getCoords();
    return (
      <ScrollView style={styles.container}>
        <FlatList
          data={article.title}
          keyExtractor={this.keyExtractor}
          renderItem={this.renderItem}
          ListEmptyComponent={<View />}
        />
        <View style={styles.textCont}>
          {
            editing
              ? (
                <TextInput
                  style={styles.nameArt}
                  defaultValue={titul}
                  onChangeText={this.newName}
                />
              )
              : <Text style={styles.nameArt}>{article.name}</Text>
          }
        </View>
        <View>
          <Image style={styles.articleImage} source={{ uri: article.image }} />
        </View>
        <View style={styles.textCont}>
          {
            editing
              ? (
                <TextInput
                  style={styles.priceStyle}
                  defaultValue={article.price.toString()}
                  onChangeText={this.newPrice}
                />
              )
              : (
                <Text style={styles.priceStyle}>
                  {' '}
                  {article.price}
                  $
                  {' '}
                </Text>
              )
          }
        </View>
        <View style={styles.description}>
          {
            editing
              ? <TextInput defaultValue={article.description} onChangeText={this.newDescription} />
              : <Text style={styles.description}>{article.description}</Text>
          }

          <Text style={styles.userName}>
            Owner:
            {' '}
            {article.owner.username}
          </Text>

          {
            article.owner.id === 1
              ? (
                <View>
                  {
                    editing
                      ? (
                        <View>
                          <Button title="Save" onPress={this.buildArticle} />
                        </View>
                      )
                      : (
                        <View style={styles.buttons}>
                          <View style={styles.buttonEdit}>
                            <TouchableHighlight
                              onPress={() => this.setState({ editing: true })}
                              style={styles.button}
                              underlayColor="transparent"
                            >
                              <Icon name="md-create" size={47} color="#02c8ef" />
                            </TouchableHighlight>

                          </View>
                          <View style={styles.buttonDelete}>
                            <TouchableHighlight
                              onPress={() => this.deleteArticle(article.id)}
                              style={styles.button}
                              underlayColor="transparent"
                            >
                              <Icon name="md-trash" size={47} color="#02c8ef" />
                            </TouchableHighlight>
                          </View>
                        </View>
                      )
                  }
                </View>
              )
              : (
                <View style={styles.buttons}>
                  <TouchableHighlight
                    onPress={() => this.addChat(article.owner.id, 1, article.id)}
                    style={styles.button}
                    underlayColor="transparent"
                  >
                    <Icon name="md-mail" size={47} color="#02c8ef" />

                  </TouchableHighlight>

                </View>
              )
          }
        </View>
        <View style={styles.map}>
        <View style={styles.pin}>
          <Iconito name="location-pin" size={25} />
          <Text>{article.location}</Text>
          </View>
          <Map location={location} />
        </View>
      </ScrollView>
    );
  }
}

InfoArticle.propTypes = {
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
    location: PropTypes.string,
  }),
  navigation: PropTypes.shape({
    dispatch: PropTypes.func,
    state: PropTypes.shape({
      params: PropTypes.shape({
        title: PropTypes.string,
        id: PropTypes.number,
        articleDescr: PropTypes.string,
        name: PropTypes.string,
      }),
    }),
  }),
};

export default InfoArticle;
