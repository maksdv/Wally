import gql from 'graphql-tag';
// get the user and all user's groups
export const USER_QUERY = gql`
  query userquery($id: Int) {
    user(id: $id) {
      id
      email
      username
      articles {
        id
        name
        price
        description
      }
    }
  }
`;
export default USER_QUERY;
