import { gql } from 'apollo-server';

export const typeDefs = gql`
 scalar Date

  input CreateUserInput {
    email: String!
    username: String!
  }

  input UpdateUserInput {
    username: String!
    email: String!
  }

  input CreateArticleInput {
    userId: Int!
    name: String!
    price: Int!
    description: String!
    image: String!
  }

  input UpdateArticleInput {
    id: Int!
    name: String!
    price: Int!
    description: String!
    image: String!
  }

  input CreateChatInput {
    ownerId: Int!
    buyerId: Int!
    articleId: Int!
  }

  input CreateMessageInput {
    userId: Int!
    chatId: Int!
    text: String!
  }

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
    createdAt: Date!
  }

  type Article{
      id: Int!
      name: String!
      description: String!
      price: Int!
      image: String!
      owner: User!
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
    userByEmail(email: String!): User
    userLogin(username: String!, password: String!): User
    users(id: Int): [User]
    user(email: String, id: Int): User
    messages(userId: Int): [Message]
    articles(userId: Int): [Article]
    article(id: Int): Article
    chats(articleId: Int): [Chat]
    chat(id: Int): Chat
    

  }

  type Mutation{

    addUser(email: String!, username: String, password: String!): User
    updateUser(user: UpdateUserInput): User
    updateUserEmail(id: Int!, email: String!): User
    deleteUser(id: Int!): User
    
    addArticle(article: CreateArticleInput): Article
    updateArticle(article: UpdateArticleInput): Article
    updateDesc(id: Int!, description: String!): Article
    deleteArticle(id: Int!): Article

    addChat(chat: CreateChatInput!): Chat
    deleteChat(id: Int!): Chat

    addMessage(message: CreateMessageInput!): Message
    deleteMessage(id: Int!): Message

  }

schema {
    query: Query
    mutation: Mutation

  }


 `;
export default typeDefs;