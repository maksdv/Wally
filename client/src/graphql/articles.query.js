import gql from 'graphql-tag';

// get the user and all user's groups

export const NEW_ARTICLE = gql`
  mutation addArticle($id: Int!, $userId: Int!, $name: String!, $description: String!, $price: Int!, $image: String!, ) {
    addArticle(id: $id, userId: $userId, name: $name, description: $description, price: $price, image: $image) {
      id
      owner{
        id
      }
      name
      description
      price
      image
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
      id
      owner{
        id
      }
      chats{
        id
      }
    }
  }
  `;
