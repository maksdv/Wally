import gql from 'graphql-tag';
// get the user and all user's groups
export const ARTICLE_QUERY = gql`
  query {
    article{
        name
        owner{
          username
        }
      }
  }
`;
export default ARTICLE_QUERY;
