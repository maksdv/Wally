import PropTypes from 'prop-types';
import React, { Component } from 'react';
import {
  FlatList, StyleSheet, View, ActivityIndicator,
} from 'react-native';
import Chat from './chat';


const styles = StyleSheet.create({
  container: {
    backgroundColor: '#dce0e8',
    flex: 1,
  },
  iconoUser: {
    marginStart: 20,
  },
  loading: {
    justifyContent: 'center',
    flex: 1,
  },
  time: {
    fontSize: 11,
  },
});

class Chats extends Component {
  static navigationOptions = {
    title: 'Chats',
  };

  keyExtractor = item => item.id.toString();

  goToMessages = chat => () => {
    const {
      navigation: { navigate },
    } = this.props;
    navigate('Messages', { name: chat.owner.username, id: chat.id, loadingMoreEntries: false });
  };

    renderItem = ({ item }) => {
      const { user } = this.props;
      return (
        <Chat chat={item} goToMessages={this.goToMessages(item)} user={user} />
      );
    };

    render() {
      const { loading, user } = this.props;
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
            data={user.chats}
            keyExtractor={this.keyExtractor}
            renderItem={this.renderItem}
          />
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
    id: PropTypes.number,
    email: PropTypes.string,
    username: PropTypes.string,
    chats: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        owner: PropTypes.shape({
          id: PropTypes.number,
          username: PropTypes.string,
        }),
      }),
    ),
  }),
};

export default Chats;
