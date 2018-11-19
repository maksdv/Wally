import PropTypes from 'prop-types';
import React, { Component } from 'react';
import {
  FlatList, StyleSheet, Text, TouchableHighlight, View, ActivityIndicator,
} from 'react-native';
import { graphql, compose } from 'react-apollo';
import { USER_QUERY } from '../graphql/user.query';
import { CHAT_QUERY } from '../graphql/chats.query';


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

const Chat = ({ chat: { id }, goToMessages }) => (
  <TouchableHighlight key={id} onPress={goToMessages}>
    <View style={styles.chatContainer}>
      <Text style={styles.chatName}>{` Chat numero ${id}`}</Text>
    </View>
  </TouchableHighlight>
);

class Chats extends Component {
  static navigationOptions = {
    title: 'Chats',
  };

  keyExtractor = item => item.id.toString();

  goToMessages = chat => () => {
    const {
      navigation: { navigate },
    } = this.props;
    console.log(chat);
    navigate('Messages', { id: chat.id });
  };

  renderItem = ({ item }) => <Chat chat={item} goToMessages={this.goToMessages(item)} />;

  render() {
    const { loading, user: { chats } } = this.props;
    if (loading) {
      return (
        <View style={[styles.loading, styles.container]}>
          <ActivityIndicator />
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <FlatList
          data={chats}
          keyExtractor={this.keyExtractor}
          renderItem={this.renderItem}
        />
      </View>
    );
  }
}

Chat.propTypes = {
  goToMessages: PropTypes.func.isRequired,
  chat: PropTypes.shape({
    id: PropTypes.number,
    owner: PropTypes.number,
    buyer: PropTypes.number,
    articleId: PropTypes.number,
  }),
};

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
        id: PropTypes.number.isRequired,
        owner: PropTypes.shape({
          id: PropTypes.number.isRequired,
          username: PropTypes.string,
        }),
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

const chatQuery = graphql(CHAT_QUERY, {
  options: () => ({}),
  props: ({ data: { loading, chats } }) => ({
    loading,
    chats: chats || [],
  }),
});


export default compose(userQuery, chatQuery)(Chats);
