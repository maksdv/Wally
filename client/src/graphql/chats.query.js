import gql from 'graphql-tag';

// get the user and all user's groups

export const NEW_CHAT = gql`
  mutation addChat($ownerId: Int!, $buyerId: Int! $articleId: Int!,) {
    addArticle(ownerId: $ownerId, buyerId: $buyer, articleId: $articleId,) {
      ownerId
      buyerId
      articleId
    }
  }
`;

export const CHAT_QUERY = gql`
  query chatquery($id: Int) {
    chat(id: $id){
      id
      from{
        id
        name
      }
      buyer{
        id
        username
      }
      owner{
        id
        username
      }
      messages{
        id
        text
        createdAt
        from {
          id
          username
        }
      }
    }
  }
`;

export const CHATS_QUERY = gql`
  query chatsquery {
    chats{
      id
      from{
        id
      }
      buyer{
        id
        username
      }
      owner{
        id
        username
      }
      messages{
        id
        text
      }
    }
  }
`;

export default CHAT_QUERY;
