import gql from 'graphql-tag';

import MESSAGE_FRAGMENT from './message.fragment';

const ADD_MESSAGE = gql`
  mutation addMessage($message: CreateMessageInput!) {
    addMessage(message: $message) {
      ...MessageFragment
    }
  }
  ${MESSAGE_FRAGMENT}
`;

export default ADD_MESSAGE;
