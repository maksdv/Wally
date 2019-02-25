import React, { Component } from 'react';
import {
  StyleSheet, Text, TouchableHighlight, View, TextInput, Alert, Image,
} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/Ionicons';


const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: 10,
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
  imgButton: {
    width: '100%',
    marginStart: '90%',
  },
});

const emptyData = data => data.some(item => item.length === 0);

class NewArticle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: this.props.auth.id,
      name: '',
      price: '',
      description: '',
      location: '',
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
      price: parseInt(text,10)
    });
  };

  newDescription = (text) => {
    this.setState({
      description: text,
    });
  };

  newLocation = (text) => {
    this.setState({
      location: text,
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
      userId, name, price, description, image, location,
    } = this.state;
    const { addArticle, onChangeText, navigation } = this.props;
    let msg = 'Oooops something went wrong...';
    
    if (!emptyData([userId, name, price, description, image, location])) {
      const newArti = await addArticle({
        userId, name, price, description, image, location,
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
      name, price, description, image, location
    } = this.state;

    return (
      <View style={styles.container}>

        {image
          ? <Image style={{ width: 200, height: 100, marginTop: 10 }} source={{ uri: image }} />
          : (  
            <TouchableHighlight onPress={this.openImagepicker} style={styles.imgButton} underlayColor='transparent'>
              <Icon name="ios-image" size={40} color='#02c8ef' />
            </TouchableHighlight>
          )
        }

        <TextInput
          style={styles.input}
          placeholder="Title"
          value={name}
          onChangeText={this.newName}
        />

        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={price ? price.toString() : ''}
          onChangeText={this.newPrice}
          placeholder="Price"
        />
        <TextInput
          placeholder="Description"
          value={description}
          onChangeText={this.newDescription}
          style={styles.input}
        />
        <TextInput
          placeholder="Location"
          value={location}
          onChangeText={this.newLocation}
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

export default NewArticle;
