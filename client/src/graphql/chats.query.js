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
  query {
    chat{
      article{
        id
      }
      buyerId{
        id
      }
      owner{
        id
      }
      messages{
        id
      }
    }
  }
`;

export default CHAT_QUERY;
