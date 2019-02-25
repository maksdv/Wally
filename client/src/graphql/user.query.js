import gql from 'graphql-tag';

// get the user and all user's groups
export const LOG_USER = gql`
  mutation login($email: String!, $password: String!){
  login(email: $email, password: $password){
    id
    jwt
    username
  }
  }
`;

export const NEW_USER = gql`
  mutation signup($email: String!, $password: String!, $username: String) {
    signup(email: $email, password: $password, username: $username) {
      id
      jwt
      username
    }
  }
`;

export const USERS = gql`
  query users {
  users{
    username
    email
  }
}
`;

export const USER_BY_EMAIL = gql`
  query userByEmail($email:String!){
    userByName(email:$email){
      email
    }
  }
`;

export const EDIT_USER_MUTATION = gql`
  mutation editUser($user: EditUserInput!) {
    editUser(user: $user) {
      id
      username
      email
    }
  }
`;

export const GET_USER = gql`
  query userLogin($username: String!, $password: String!) {
    userLogin(username: $username, password: $password) {
      id
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
        image
        owner{
          id
        }
      }
      chats{
        messages(messageConnection: {first: 1, after: ""}){
          edges{
            node{
              createdAt
              text
            }
          }
        }
        id
        buyer{
          username
        }
        owner{
          username
        }
        from{
          id
          image
          name
        }
      }
    }
  }
`;


export default USER_QUERY;
