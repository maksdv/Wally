import gql from 'graphql-tag';
import MESSAGE_FRAGMENT from './message.fragment';

// get the user and all user's groups

export const NEW_CHAT = gql`
  mutation addChat($chat:CreateChatInput!){
  addChat(chat:$chat){
    id
  }
}
`;

export const DELETE_CHAT = gql`
  mutation deleteChat($id: Int!) {
    chat(id: $id){
      id
    }
   }
`;

export const CHAT_QUERY = gql`
  query chatquery($id: Int, $connectionInput: ConnectionInput!) {
    chat(id: $id){
      id
      from{
        id
        name
      }
      buyer{
        id
        username
      }
      owner{
        id
        username
      }
      messages(messageConnection: $connectionInput){
      pageInfo
        edges{
          cursor
          node{
            ...MessageFragment
          }
        }
      }
    }
  }${MESSAGE_FRAGMENT}
`;

export const CHATS_QUERY = gql`
  query chatsquery {
    chats{
      id
      from{
        id
      }
      buyer{
        id
        username
      }
      owner{
        id
        username
      }
      messages(messageConnection: $connectionInput){
      pageInfo{
        hasNextPage
        hasPreviousPage
      }
        edges{
          cursor
          node{
            ...MessageFragment
          }
        }
      }
    }
  }${MESSAGE_FRAGMENT}
`;


export default CHAT_QUERY;
