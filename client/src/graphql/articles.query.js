import gql from 'graphql-tag';

// get the user and all user's groups

export const NEW_ARTICLE = gql`
  mutation addArticle($description: String!, $price: Int! $userId: Int!,) {
    addArticle(description: $description, price: $price, userId: $userId,) {
      description
      price
      userId
    }
  }
`;

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
