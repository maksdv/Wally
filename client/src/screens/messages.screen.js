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
import CREATE_MESSAGE_MUTATION from '../graphql/create-message.mutation';


const styles = StyleSheet.create({
  container: {
    alignItems: 'stretch',
    backgroundColor: '#e5ddd5',
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
    const { addMessage, navigation } = this.props;
    addMessage({
      id: navigation.state.params.id,
      userId: 1, // faking the user for now
      text,
    }).then(() => {
      this.flatList.scrollToEnd({ animated: true });
    });
  };

  keyExtractor = item => item.id.toString();

  renderItem = ({ item, item: { isCurrentUser, color } }) => {
    console.log(item);
    return (
      <Message color={color} isCurrentUser={isCurrentUser} message={item} />
    );
  };

  send = (text) => {
    // TODO: send the message
    console.log(`sending message: ${text}`);
  };

  render() {
    const { chat } = this.props;

    if (!chat) {
      return null;
    }

    console.log('>>>>>>>', chat);

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
        id: PropTypes.number,
        text: PropTypes.string,
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
  options: (ownProps) => {
    console.log('@@@@@@@', ownProps);
    return ({
      variables: {
        id: ownProps.navigation.state.params.id,
      },
    });
  },
  props: (x, y) => {
    const { data: { loading, chat } } = x;
    console.log('#######', x, y);
    return ({
      loading,
      chat,
    });
  },
});

const addMessageMutation = graphql(CREATE_MESSAGE_MUTATION, {
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
            id: message.id,
          },
        },
      },

      update: (store, { data: { addMessage } }) => {
        // Read the data from our cache for this query.
        const chatData = store.readQuery({
          query: CHAT_QUERY,
          variables: {
            id: message.id,
          },
        });

        // Add our message from the mutation to the end.
        chatData.chat.messages.unshift(addMessage);
        // Write our data back to the cache.
        store.writeQuery({
          query: CHAT_QUERY,
          variables: {
            id: message.id,
          },
          data: chatData,
        });
      },
    }),
  }),
});

export default compose(chatQuery, addMessageMutation)(Messages);
