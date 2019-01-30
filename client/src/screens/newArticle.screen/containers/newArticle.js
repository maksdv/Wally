import { graphql, compose } from 'react-apollo';
import { USER_QUERY } from '../../../graphql/user.query';
import { NEW_ARTICLE } from '../../../graphql/articles.query';
import NewArticle from '../components/newArticle';
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
    refetchQueries: [{ query: USER_QUERY }, 'user'],
  }),
});


const getArtic = graphql(NEW_ARTICLE, {
  props: ({ mutate }) => ({
    addArticle: article => mutate({
      variables: { article },
      refetchQueries: [{ query: ARTICLES_QUERY },{ query: USER_QUERY }, 'articles', 'user'],
      refetchQueries: [{ query: USER_QUERY }, 'user']
    }),
  }),
});

export default compose(getArtic, userQuery)(NewArticle);
