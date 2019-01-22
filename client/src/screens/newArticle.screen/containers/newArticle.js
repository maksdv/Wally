import { graphql, compose } from 'react-apollo';
import { USER_QUERY } from '../../../graphql/user.query';
import { NEW_ARTICLE } from '../../../graphql/articles.query';
import NewArticle from '../components/newArticle';


const userQuery = graphql(USER_QUERY, {
  options: () => ({ variables: { id: 1 } }), // fake the user for now
  props: ({ data: { loading, user } }) => ({
    loading,
    user,
  }),
});


const getArtic = graphql(NEW_ARTICLE, {
  props: ({ mutate }) => ({
    addArticle: article => mutate({
      variables: { article },
      refetchQueries: [{ query: USER_QUERY }, 'user'],
    }),
  }),
});

export default compose(getArtic, userQuery)(NewArticle);
