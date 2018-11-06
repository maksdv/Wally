import gql from 'graphql-tag';
// get the user and all user's groups
export const ARTICLE_QUERY = gql`
  query article ($id: Int) {
    article(id: $id){
      name
      description
      price
      owner{
         username
       }
     }
  }
`;
export default ARTICLE_QUERY;
