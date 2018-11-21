import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';

import {
  StyleSheet, Text, TouchableHighlight, Picker, View, TextInput, Input, Alert,
} from 'react-native';
import { NEW_ARTICLE } from '../graphql/articles.query';


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
});

const emptyData = data => data.some(item => item.length === 0);

class NewArticle extends Component {

  constructor(props) {
    super(props);
    this.state = {
      id: 0,
      userId: 1,
      name: '',
      price: '',
      description: '',
      image: 'https://cdn-images-1.medium.com/max/1200/1*DVkLFr953djSo0q6cA0-kg.png',
    };
  }

  newName = (text) => {
    this.setState({
      name: text,
    });
  };

  newId = (text) => {
    this.setState({
      id: text,
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

  handleCreate = async () => {
    const {
      id, userId, name, price, description, image,
    } = this.state;
    const { addArticle, onChangeText } = this.props;
    let msg = 'Oooops something went wrong...';

    if (!emptyData([id, userId, name, price, description, image])) {
      console.log('me cago en dios');
      const newArti = await addArticle({ id, userId, name, price, description, image })
        .then(res => res.data.addArticle)
        .catch(err => console.log(err));
      msg = `Yeah! The  ${newArti.name} has been created!`;
      screenChange = onChangeText;
    }
    Alert.alert('Register', msg, [{ text: 'OK' }], {
      cancelable: false,
    });
  };

  render() {
    const {
      name, price, description,
    } = this.state;

    return (
      <View style={styles.container}>
        <Picker mode="dropdown" style={{ height: 50, width: 200 }}>
          <Picker.Item label="Elige una categoría" value="ere" />
          <Picker.Item label="Deportes" value="deportes" />
          <Picker.Item label="Pesca" value="pesca" />
          <Picker.Item label="Coches" value="coches" />
          <Picker.Item label="Juguetes" value="juguetes" />
          <Picker.Item label="Telefonía" value="telefonia" />
          <Picker.Item label="Tecnología" value="tecnologia" />
          <Picker.Item label="Bebes" value="bebes" />
          <Picker.Item label="Hogar" value="hogar" />
        </Picker>

        <TextInput
          style={styles.input}
          placeholder="Titulo"
          value={name}
          onChangeText={this.newName}
        />

        <TextInput
          style={styles.input}
          keyboardType={'numeric'}
          value={price}
          onChangeText={this.newPrice}
          placeholder="Precio"
        />
        <TextInput
          placeholder="Descripción"
          value={description}
          onChangeText={this.newDescription}
          style={styles.input}
        />
        <TouchableHighlight
          style={styles.button}
          underlayColor="#02c8ef"
          onPress={this.handleCreate}
        >
          <Text> V e n d e r </Text>
        </TouchableHighlight>
      </View>
    );
  }
}

const getArtic = graphql(NEW_ARTICLE, {
  props: ({ mutate }) => ({
    addArticle: article => mutate({
      variables: { article },
    }),
  }),
});

/*const getArtic = graphql(NEW_ARTICLE, {
  props: ({ mutate }) => ({
    addArticle: (id, userId, name, price, description, image, ) => mutate({
      variables: { id, userId, name, price, description, image, },
      optimisticResponse: {
        __typename: 'Mutation',
        addArticle: {
          __typename: 'Article',
          id: -1, // don't know id yet, but it doesn't matter
          description: description, // we know what the text will be
          price: price,
          image: image,
          name: name,
          userId: userId,
          createdAt: new Date().toISOString(), // the time is now!
          owner: {
            __typename: 'User',
            id: userId, // still faking the user
            username: 'Maurine42', // still faking the user
          },
        },
      },
    }),
  }),
});*/

export default compose(getArtic)(NewArticle);