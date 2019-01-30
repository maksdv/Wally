
import { graphql, compose } from 'react-apollo';
import Articles from '../components/articles';
import { USER_QUERY } from '../../../graphql/user.query';
import { ARTICLES_QUERY } from '../../../graphql/articles.query';

const userQuery = graphql(USER_QUERY, {
  options: () => ({ variables: { id: 1 } }), // fake the user for now
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

export default compose(articlesquery, userQuery)(Articles);
