import { graphql, compose } from "react-apollo";
import { connect } from "react-redux";
import { USER_QUERY } from "../../../graphql/user.query";
import NewArticle from "../components/newArticle";
import { ARTICLES_QUERY, NEW_ARTICLE } from "../../../graphql/articles.query";

const userQuery = graphql(USER_QUERY, {
  options: auth => ({ variables: { id: auth.auth.id } }), // fake the user for now
  props: ({ data: { loading, user } }) => ({
    loading,
    user
  })
});
const mapStateToProps = ({ auth }) => ({
  auth
});

const articlesquery = graphql(ARTICLES_QUERY, {
  options: () => ({}),
  props: ({ data: { loading, articles } }) => ({
    loading,
    articles: articles || []
  })
});

const getArtic = graphql(NEW_ARTICLE, {
  props: ({ mutate }) => ({
    addArticle: article =>
      mutate({
        variables: { article },
        refetchQueries: [{ query: ARTICLES_QUERY }, "articles"]
      })
  })
});

export default compose(
  connect(mapStateToProps),
  getArtic,
  userQuery
)(NewArticle);
