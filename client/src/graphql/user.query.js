import gql from 'graphql-tag';

// get the user and all user's groups

export const NEW_USER = gql`
  mutation addUser($email: String!, $username: String!, $password: String! ) {
    addUser(email: $email, username: $username, password: $password) {
      username
      email
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
        messages{
          edges{
            node{
              createdAt
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
