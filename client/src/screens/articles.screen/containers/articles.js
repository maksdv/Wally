import { connect } from 'react-redux';
import { graphql, compose } from 'react-apollo';
import Articles from '../components/articles';
import { USER_QUERY } from '../../../graphql/user.query';
import { ARTICLES_QUERY } from '../../../graphql/articles.query';

const userQuery = graphql(USER_QUERY, {
  options: auth => ({ variables: { id: auth.auth.id } }), // fake the user for now
  props: ({ data: { loading, user } }) => ({
    loading,
    user,
  }),
});

const articlesquery = graphql(ARTICLES_QUERY, {
  options: () => ({}),
  props: ({ data: { loading, articles } }) => ({
    loading,
    articles: articles || [],
  }),
});
const mapStateToProps = ({ auth }) => ({
  auth,
});
export default compose(
  connect(mapStateToProps),
  articlesquery,
  userQuery,
)(Articles);
