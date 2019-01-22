import { gql } from 'apollo-server';

export const typeDefs = gql`
 scalar Date

  input ConnectionInput {
    first: Int
    after: String
    last: Int
    before: String
  }

  type PageInfo {
    hasNextPage: Boolean!
    hasPreviousPage: Boolean!
  }

  type MessageConnection {
    edges: [MessageEdge]
    pageInfo: PageInfo!
  }

  type MessageEdge {
    cursor: String!
    node: Message!
  }

  type ArticleConnection {
    edges: [ArticleEdge]
    pageInfo: PageInfo!
  }

  type ArticleEdge {
    cursor: String!
    node: Article!
  }

  input CreateUserInput {
    email: String!
    password: String!
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
    chatId: Int!
    text: String!
  }

 type User {
    id: Int! 
    email: String! 
    username: String!
    #articles(articleConnection: ConnectionInput): ArticleConnection
    articles: [Article!]!
    chats: [Chat!]!
    jwt: String,
    
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
    messages(messageConnection: ConnectionInput): MessageConnection
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
    login(email: String!, password: String!): User
    signup(user: CreateUserInput): User

  }

schema {
    query: Query
    mutation: Mutation

  }


 `;
export default typeDefs;