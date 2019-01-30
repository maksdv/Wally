
import gql from 'graphql-tag';

export const ARTICLE_FRAGMENT = gql`
  fragment ArticleFragment on Article {
    id
    owner{
      id
    }
    name
    description
    price
    image  
    location  
  }
`;

export default ARTICLE_FRAGMENT;
