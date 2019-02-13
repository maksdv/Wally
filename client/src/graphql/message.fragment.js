
import gql from 'graphql-tag';

const MESSAGE_FRAGMENT = gql`
  fragment MessageFragment on Message {
    id
    text
    createdAt
    to {
      id
    }
    from {
      id
      username
    }
  }
`;

export default MESSAGE_FRAGMENT;
