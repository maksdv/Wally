import gql from 'graphql-tag';

// get the user and all user's groups

export const NEW_ARTICLE = gql`
  mutation addArticle($id: Int!, $name: String!, $description: String!, $price: Int!, $image: String!) {
    addArticle(id: $id, name: $name, description: $description, price: $price, image: $image) {
      name
      description
      price
      id
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
