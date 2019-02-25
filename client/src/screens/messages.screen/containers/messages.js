
import R from 'ramda';
import { connect } from 'react-redux';
import { graphql, compose } from 'react-apollo';
import { CHAT_QUERY } from '../../../graphql/chats.query';
import ADD_MESSAGE from '../../../graphql/messages.query';
import Messages from '../components/messages';
import withLoading from '../../../components/WithLoading';


const ITEMS_PER_PAGE = 5;
const chatQuery = graphql(CHAT_QUERY, {
  options: (ownProps) => {
    console.log(ownProps.navigation.state.params.id, ownProps.auth, 'ZZZZ'); return ({
      variables: {
        id: ownProps.navigation.state.params.id,
        connectionInput: {
          first: ITEMS_PER_PAGE,
        },
      },
    });
  },
  props: ({ data: { fetchMore, loading, chat } }) => {
    console.log('---------------------------------------------', chat); return ({
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
    });
  },
});

const addMessageMutation = graphql(ADD_MESSAGE, {
  props: ({ mutate }) => ({
    addMessage: message => mutate({
      variables: { message },
      
    }),
  }),
});
const mapStateToProps = ({ auth }) => ({
  auth,
});

export default compose(connect(mapStateToProps),
  withLoading, addMessageMutation, chatQuery)(Messages);
