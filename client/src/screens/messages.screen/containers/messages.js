
import R from 'ramda';
import { graphql, compose } from 'react-apollo';
import { CHAT_QUERY } from '../../../graphql/chats.query';
import { USER_QUERY } from '../../../graphql/user.query';
import ADD_MESSAGE from '../../../graphql/messages.query';
import Messages from '../components/messages';


const ITEMS_PER_PAGE = 5;
const chatQuery = graphql(CHAT_QUERY, {
  options: ownProps => ({
    variables: {
      id: ownProps.navigation.state.params.id,
      connectionInput: {
        first: ITEMS_PER_PAGE,
      },
    },
  }),
  props: ({ data: { fetchMore, loading, chat } }) => ({
    loading,
    chat,
    loadMoreEntries() {
      return fetchMore({
        // query: ... (you can specify a different query.
        // chat_QUERY is used by default)
        variables: {
          connectionInput: {
            first: ITEMS_PER_PAGE,
            after: chat.messages.edges[chat.messages.edges.length - 1].cursor,
          },
        },
        updateQuery: (previousResult, { fetchMoreResult }) => {
          // we will make an extra call to check if no more entries
          if (!fetchMoreResult) {
            return previousResult;
          }

          const edgesLens = R.lensPath(['chat', 'messages', 'edges']);
          const pageInfoLens = R.lensPath(['chat', 'messages', 'pageInfo']);

          const moreEdges = R.view(edgesLens, fetchMoreResult);

          // push results (older messages) to end of messages list
          return R.compose(
            R.set(pageInfoLens, R.view(pageInfoLens, fetchMoreResult)),
            R.over(edgesLens, xs => R.concat(xs, moreEdges)),
          )(previousResult);
        },
      });
    },
  }),
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
            username: 'COmpra la version premium, gilipollas', // still faking the user
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
        chatData.chat.messages.edges.unshift({
          __typename: 'MessageEdge',
          node: createMessage,
          cursor: Buffer.from(createMessage.id.toString()).toString('base64'),
        });
        // Write our data back to the cache.
        store.writeQuery({
          query: CHAT_QUERY,
          variables: {
            id: message.chatId,
            messageConnection: { first: ITEMS_PER_PAGE },
          },
          data: chatData,
        });
        const userData = store.readQuery({
          query: USER_QUERY,
          variables: {
            id: 1, // faking the user for now
          },
        });

        // check whether the mutation is the latest message and update cache
        const updatedChat = userData.user.chats.find(({ id }) => id === message.chatId);
        if (
          !updatedChat.messages.edges.length
            || isBefore(updatedChat.messages.edges[0].node.createdAt, createMessage.createdAt)
        ) {
          // update the latest message
          updatedChat.messages.edges[0] = {
            __typename: 'MessageEdge',
            node: createMessage,
            cursor: Buffer.from(createMessage.id.toString()).toString('base64'),
          };
          // Write our data back to the cache.
          store.writeQuery({
            query: USER_QUERY,
            variables: {
              id: 1, // faking the user for now
            },
            data: userData,
          });
        }
      },
    }),
  }),
});


export default compose(addMessageMutation, chatQuery)(Messages);
