import { graphql, compose } from 'react-apollo';
import { USER_QUERY } from '../../../graphql/user.query';
import Chats from '../components/chats';

const userQuery = graphql(USER_QUERY, {
  options: () => ({ variables: { id: 1 } }), // fake the user for now
  props: ({ data: { loading, user } }) => ({
    loading,
    user,
  }),
});


export default compose(userQuery)(Chats);
