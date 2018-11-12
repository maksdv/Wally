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
  query articlequery($id: Int) {
    article(id: $id){
      name
      description
      price
      image
      owner{
        id
        username
      }
      chats{
        id
      }
    }
  }
`;

export const ARTICLES_QUERY = gql`
  query articlesquery {
    articles {
      name
      description
      price
      image
      owner{
        id
      }
      chats{
        id
      }
    }
  }
  `;
