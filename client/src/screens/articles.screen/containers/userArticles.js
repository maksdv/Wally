
import { graphql, compose } from 'react-apollo';
import userArticles from '../components/userArticles';
import { USER_QUERY } from '../../../graphql/user.query';

const userQuery = graphql(USER_QUERY, {
  options: () => ({ variables: { id: 1 } }), // fake the user for now
  props: ({ data: { loading, user } }) => ({
    loading,
    user,
  }),
});

export default compose(userQuery)(userArticles);
