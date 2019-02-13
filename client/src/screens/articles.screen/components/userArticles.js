import PropTypes from 'prop-types';
import React from 'react';
import {
  FlatList, StyleSheet, TextInput, View, ActivityIndicator,
} from 'react-native';
import AddButton from '../../../components/addButton';
import Articles from './article';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#dce0e8',
    flex: 1,
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
  loading: {
    justifyContent: 'center',
    flex: 1,
  },
});

class userArticles extends Articles {
  static navigationOptions = {
    title: 'Store',
  };

  constructor(props) {
    super(props);
    this.state = { text: '' };
  }

  render() {
    const { text } = this.state;
    const { loading, user } = this.props;
    const { articles } = user.articles;

    if (loading) {
      return (
        <View style={[styles.loading, styles.container]}>
          <ActivityIndicator />
        </View>
      );
    }
    if (!user) {
      return null;
    }

    return (
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Search"
          onChangeText={newText => this.setState({ text: newText })}
          value={text}
        />
        <FlatList
          data={articles.filter(x => x.user.id === 1).filter(x => x.name.toLowerCase().includes(text.toLowerCase()))}
          numColumns={2}
          keyExtractor={this.keyExtractor}
          renderItem={this.renderItem}
        />
        <View>
          <AddButton onPress={this.goToNewArticle(user)} />
        </View>
      </View>
    );
  }
}

export default userArticles;
