import gql from 'graphql-tag';

// get the user and all user's groups

export const NEW_USER = gql`
  mutation addUser($email: String!, $username: String!,) {
    addNewUser(email: $email, username: $username,) {
      username
      email
    }
  }
`;

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
      chats{
        id
      }
    }
  }
`;

export default USER_QUERY;
