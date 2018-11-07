import PropTypes from 'prop-types';
import React, { Component } from 'react';
import {
  FlatList, StyleSheet, Text, TouchableHighlight, View, ActivityIndicator,
} from 'react-native';

import { graphql } from 'react-apollo';
import { USER_QUERY } from '../graphql/user.query';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
  chatContainer: {
    flex: 1,
    flexDirection: 'row',
    width: 300,
    height: 30,
    margin: 5,
    alignItems: 'center',
    borderRadius: 8,
    backgroundColor: '#c3d0e5',
    borderColor: 'grey',
  },
  chatName: {
    fontWeight: 'bold',
    flex: 0.7,
  },
  loading: {
    justifyContent: 'center',
    flex: 1,
  },
});

const Chat = ({ goToChat, chat: { id } }) => (
  <TouchableHighlight key={id} onPress={goToChat}>
    <View style={styles.chatContainer}>
      <Text style={styles.chatName}>{'  Chat numero '+id}</Text>
    </View>
  </TouchableHighlight>
);

Chat.propTypes = {
  goToChat: PropTypes.func.isRequired,
  chat: PropTypes.shape({
    id: PropTypes.number,
    owner: PropTypes.number,
    buyer: PropTypes.number,
    articleId: PropTypes.number,
  }),
};

class Chats extends Component {
  static navigationOptions = {
    title: 'Chats',
  };

  keyExtractor = item => item.id.toString();

  goToChat = chat => () => {
    const {
      navigation: { navigate },
    } = this.props;
    navigate('Messeges', { ChatId: chat.id, title: chat.id, articleId: chat.articleId });
  };

  renderItem = ({ item }) => <Chat chat={item} goToChat={this.goToChat(item)} />;

  render() {
    const { loading, user } = this.props;
    if (loading) {
      return (
        <View style={[styles.loading, styles.container]}>
          <ActivityIndicator />
        </View>
      );
    }
    if (!user) return null;

    return (
      <View style={styles.container}>
        <FlatList data={user.chats} keyExtractor={this.keyExtractor} renderItem={this.renderItem} />
      </View>
    );
  }
}

Chats.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }),
  loading: PropTypes.bool,
  user: PropTypes.shape({
    id: PropTypes.number.isRequired,
    email: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    chats: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.arrayOf,
        owner: PropTypes.number.isRequired,
        buyer: PropTypes.number.isRequired,
        article: PropTypes.number.isRequired,
      }),
    ),
  }),
};

const userQuery = graphql(USER_QUERY, {
  options: () => ({ variables: { id: 1 } }), // fake the user for now
  props: ({ data: { loading, user } }) => ({
    loading,
    user,
  }),
});

export default userQuery(Chats);
