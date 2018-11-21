import PropTypes from 'prop-types';
import { graphql, compose } from 'react-apollo';
import {
  FlatList,
  StyleSheet,
  View,
  Text,
} from 'react-native';
import React, { Component } from 'react';
import Message from '../components/message.component';
import MessageInput from '../components/inputMessages.component';
import { CHAT_QUERY } from '../graphql/chats.query';
import ADD_MESSAGE from '../graphql/messages.query';


const styles = StyleSheet.create({
  container: {
    alignItems: 'stretch',
    backgroundColor: '#edf4ff',
    flex: 1,
    flexDirection: 'column',
  },
});

class Messages extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: `${navigation.state.params.title}`,
  });

  constructor(props) {
    super(props);
    this.renderItem = this.renderItem.bind(this);
  }

  send = (text) => {
    const { addMessage, chat } = this.props;
    console.log('----------->', text);
    addMessage({
      chatId: chat.id,
      userId: 1, // faking the user for now
      text,
    }).then(() => {
      console.log('·······', text);
      this.flatList.scrollToEnd({ animated: true });
    }).catch(err => console.log('@@@@@@@@', err));
  };

  keyExtractor = item => item.id.toString();

  renderItem = ({ item, item: { color } }) => {
    const isCurrentUser = (item.from.id === 1); // fucking the user for now ;)
    return (
      <Message color={color} isCurrentUser={isCurrentUser} message={item} />
    );
  };

  render() {
    const { chat } = this.props;

    if (!chat) {
      return null;
    }

    return (
      <View style={styles.container}>
        <FlatList
          ref={(ref) => {
            this.flatList = ref;
          }}
          data={chat.messages.reverse()}
          keyExtractor={this.keyExtractor}
          renderItem={this.renderItem}
          ListEmptyComponent={<View />}
        />
        <MessageInput send={this.send} />
      </View>
    );
  }
}

Messages.propTypes = {
  addMessage: PropTypes.func,
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
    state: PropTypes.shape({
      params: PropTypes.shape({
        id: PropTypes.number,
        title: PropTypes.string,
      }),
    }),
  }),
  chat: PropTypes.shape({
    id: PropTypes.number.isRequired,
    messages: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        text: PropTypes.string.isRequired,
      }),
    ),
    owner: PropTypes.shape({
      id: PropTypes.number,
      username: PropTypes.string,
    }),
    buyer: PropTypes.shape({
      id: PropTypes.number,
      username: PropTypes.string,
    }),
  }),
};

const chatQuery = graphql(CHAT_QUERY, {
  options: ownProps => ({
    variables: {
      id: ownProps.navigation.state.params.id,
    },
  }),
  props: (x) => {
    const { data: { loading, chat } } = x;
    return ({
      loading,
      chat,
    });
  },
});

const addMessageMutation = graphql(ADD_MESSAGE, {
  props: ({ mutate }) => ({
    addMessage: message => mutate({
      variables: { message },
      optimisticResponse: {
        __typename: 'Mutation',
        addMessage: {
          __typename: 'Message',
          id: -1, // don't know id yet, but it doesn't matter
          text: message.text, // we know what the text will be
          createdAt: new Date().toISOString(), // the time is now!
          from: {
            __typename: 'User',
            id: 1, // still faking the user
            username: 'Brook.Hudson', // still faking the user
          },
          to: {
            __typename: 'Chat',
            id: message.chatId,
          },
        },
      },

      update: (store, { data: { addMessage } }) => {
        // Read the data from our cache for this query.
        const chatData = store.readQuery({
          query: CHAT_QUERY,
          variables: {
            id: message.chatId,
          },
        });

        // Add our message from the mutation to the end.
        chatData.chat.messages.unshift(addMessage);
        // Write our data back to the cache.
        store.writeQuery({
          query: CHAT_QUERY,
          variables: {
            id: message.chatId,
          },
          data: chatData,
        });
      },
    }),
  }),
});

export default compose(chatQuery, addMessageMutation)(Messages);
