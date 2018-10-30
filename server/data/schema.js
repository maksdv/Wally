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
    createdAt: Date!
  }

  type Article{
      id: Int!
      name: String!
      description: String!
      price: Int!
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
    user(email: String, id: Int): User
    messages(userId: Int): [Message]
    articles(userId: Int): [Article]
    chats(articleId: Int): [Chat]

}

schema {
    query: Query
  }


 `;
export default typeDefs;
