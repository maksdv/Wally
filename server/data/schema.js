import { gql } from 'apollo-server';

export const typeDefs = gql`
 scalar Date
 
 type User {
    id: Int! 
    email: String! 
    username: String!
    articles: [Article!]!
    chats: [Chat!]!
    
  }
  type Message {
    id: Int!
    to: Chat!
    from: User!
    text: String!
  }

  type Article{
      id: Int!
      name: String!
      description: String!
      price: Int!
      image: String!
      owner: User
      chats: [Chat!]!
  }

  type Chat{
    id: Int!
    buyer: User!
    owner: User!
    messages: [Message!]!
    from: Article!

  }

  type Query{
    users(id: Int): [User]
    user(email: String, id: Int): User
    messages(userId: Int): [Message]
    articles(userId: Int): [Article]
    article(id: Int): Article
    chats(articleId: Int): [Chat]
    chat(id: Int): Chat
    

  }

  type Mutation{

    addUser(email: String!, username: String!): User
    updateUserEmail(id: Int!, email: String!): User
    deleteUser(id: Int!): User
    
    addArticle(id: Int!, name: String!, price: Int!, description: String!, image: String!): Article
    updatePrice(id: Int!, price: Int!): Article
    updateDesc(id: Int!, description: String!): Article
    deleteArticle(id: Int!): Article

    addChat(id: Int!, ownerId: Int!, buyerId: Int!, artileId: Int!): Chat
    deleteChat(id: Int!): Chat

    addMessage(userId: Int!, chatId: Int!, Text: String!): Message
    deleteMessage(id: Int!): Message

  }

schema {
    query: Query
    mutation: Mutation

  }


 `;
export default typeDefs;
