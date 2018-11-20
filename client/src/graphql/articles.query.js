import gql from 'graphql-tag';
import { ARTICLE_FRAGMENT } from './article.fragment';

// get the user and all user's groups

export const NEW_ARTICLE = gql`
  mutation addArticle($article: CreateArticleInput!) {
    addArticle(article: $article) {
      ...ArticleFragment
    }
  }
  ${ARTICLE_FRAGMENT}
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
