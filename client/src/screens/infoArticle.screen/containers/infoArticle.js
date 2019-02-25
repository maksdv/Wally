import { graphql, compose } from "react-apollo";
import { connect } from "react-redux";
import { USER_QUERY } from "../../../graphql/user.query";
import {
  ARTICLE_QUERY,
  UPDATE_ARTICLE,
  DELETE_ARTICLE
} from "../../../graphql/articles.query";
import { NEW_CHAT, CHAT_QUERY } from "../../../graphql/chats.query";
import InfoArticle from "../components/infoArticle";

const updateArticle = graphql(UPDATE_ARTICLE, {
  props: ({ mutate }) => ({
    updateArticle: article =>
      mutate({
        variables: { article }
      }),
    update: (store, { data: { updateArticle } }) => {
      // Read the data from our cache for this query.
      const userData = store.readQuery({
        query: USER_QUERY,
        variables: {
          id: article.userId
        }
      });
      data.updateArticle.name = name;
      data.updateArticle.price = price;
      data.updateArticle.image = image;
      data.updateArticle.description = description;
      // Add our message from the mutation to the end.
      userData.user.articles.unshift(updateArticle);
      // Write our data back to the cache.
      store.writeQuery({
        query: USER_QUERY,
        variables: {
          id: article.userId
        },
        data: userData
      });
    }
  })
});

const articleQuery = graphql(ARTICLE_QUERY, {
  options: ownProps => ({
    variables: { id: ownProps.navigation.state.params.id }
  }),
  props: ({ data: { loading, article } }) => ({
    loading,
    article
  })
});

const deleteArticle = graphql(DELETE_ARTICLE, {
  props: ({ mutate }) => ({
    deleteArticle: ({ id }) =>
      mutate({
        variables: { id },
        refetchQueries: [{ query: USER_QUERY }, "user"]
      })
  })
});

const addchat = graphql(NEW_CHAT, {
  props: ({ mutate }) => ({
    addChat: chat =>
      mutate({
        variables: { chat }
        /* refetchQueries: [{ query: USER_QUERY }, 'user'] */
      })
  })
});

const chatQuery = graphql(CHAT_QUERY, {
  options: () => ({}),
  props: ({ data: { loading, chats } }) => ({
    loading,
    chats: chats || []
  })
});

const userQuery = graphql(USER_QUERY, {
  options: (auth) => ({ variables: { id: auth.auth.id } }), // fake the user for now
  props: ({ data: { loading, user } }) => ({
    loading,
    user,
  }),
});
const mapStateToProps = ({ auth }) => ({
  auth,
});

export default compose(
  connect(mapStateToProps),
  updateArticle,
  userQuery,
  addchat,
  chatQuery,
  deleteArticle,
  articleQuery,
)(InfoArticle);
