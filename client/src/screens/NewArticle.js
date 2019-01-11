import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';

import {
  StyleSheet, Text, TouchableHighlight, Picker, View, TextInput, Input, Alert, Image,
} from 'react-native';
import { USER_QUERY } from '../graphql/user.query';
import { NEW_ARTICLE } from '../graphql/articles.query';
import ImagePicker from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/Feather';


const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  input: {
    borderBottomWidth: 0.5,
    borderColor: '#b7b9bc',
    width: '95%',
  },
  chooseCat: {
    marginTop: 10,
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#69e0ba',
    padding: 10,
    borderRadius: 20,
    width: '80%',
    height: 40,
    marginTop: 20,
  },
  imgStyle: {
  
  },
});

const emptyData = data => data.some(item => item.length === 0);

class NewArticle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: 1,
      name: '',
      price: '',
      description: '',
      image: undefined,
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

  openImagepicker = () => {
    const options = {
      title: 'Select Avatar',
      customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
    
        this.setState({ 
          image: response.uri,
        });
      }
    });
  }

  handleCreate = async () => {
    const {
      userId, name, price, description, image,
    } = this.state;
    const { addArticle, onChangeText, navigation } = this.props;
    let msg = 'Oooops something went wrong...';

    if (!emptyData([userId, name, price, description, image])) {
      const newArti = await addArticle({
        userId, name, price, description, image,
      })
        .then(res => res.data.addArticle)
        .catch(err => console.log(err));
      msg = `Yeah! The  ${newArti.name} has been created!`;
      screenChange = onChangeText;
    }
    Alert.alert('Register', msg, [{ text: 'OK' }], {
      cancelable: false,
    });

    navigation.navigate('MyStore');
  };

  render() {
    const {
      name, price, description, image,
    } = this.state;

    return (
      <View style={styles.container}>
        <TouchableHighlight style={styles.imgStyle}  onPress = {this.openImagepicker}>
          { image ?
          <Image style={{width: '80%',height: '20%'}} source={{uri: image}}/>:
          <Icon.Button
              iconStyle={styles.imgStyle}
              name="image"
              size={40}
              style={styles.imgButton}
              onPress={this.openImagepicker}
            />
          }
        </TouchableHighlight>
        <TextInput
          style={styles.input}
          placeholder="Title"
          value={name}
          onChangeText={this.newName}
        />

        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={price}
          onChangeText={this.newPrice}
          placeholder="Price"
        />
        <TextInput
          placeholder="Description"
          value={description}
          onChangeText={this.newDescription}
          style={styles.input}
        />
        <TouchableHighlight
          style={styles.button}
          underlayColor="#02c8ef"
          onPress={this.handleCreate}
        >
          <Text> S e l l </Text>
        </TouchableHighlight>
      </View>
    );
  }
}

const getArtic = graphql(NEW_ARTICLE, {
  props: ({ mutate }) => ({
    addArticle: article => mutate({
      variables: { article },
      optimisticResponse: {
        __typename: 'Mutation',
        addArticle: {
          __typename: 'Article',
          id: -1, // don't know id yet, but it doesn't matter
          name: article.name, // we know what the text will be
          createdAt: new Date().toISOString(), // the time is now!
          description: article.description,
          price: parseInt(article.price, 10),
          image: article.image.uri,
          owner: {
            __typename: 'User',
            id: 1, // still faking the user
            username: 'Brook.Hudson', // still faking the user
          },
          chats: [],
        },
      },

      update: (store, { data: { addArticle } }) => {
        // Read the data from our cache for this query.
        const userData = store.readQuery({
          query: USER_QUERY,
          variables: {
            id: article.userId,
          },
        });

        // Add our message from the mutation to the end.
        userData.user.articles.unshift(addArticle);
        // Write our data back to the cache.
        store.writeQuery({
          query: USER_QUERY,
          variables: {
            id: article.userId,
          },
          data: userData,
        });
      },
    }),
  }),
});

export default compose(getArtic)(NewArticle);
