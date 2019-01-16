import gql from 'graphql-tag';

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
  query chatquery($id: Int) {
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
      messages{
        id
        text
        createdAt
        from {
          id
          username
        }
      }
    }
  }
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
      messages{
        id
        text
      }
    }
  }
`;


export default CHAT_QUERY;
