
import gql from 'graphql-tag';

export const ARTICLE_FRAGMENT = gql`
  fragment ArticleFragment on Message {
    id
    owner{
      id
    }
    name
    description
    price
    image    
  }
`;

export default ARTICLE_FRAGMENT;
