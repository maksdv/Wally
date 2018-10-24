import { gql } from 'apollo-server';

export const typeDefs = gql`
 scalar Date
 
 type User {
    id: Int! 
    email: String! 
    username: String!
    messages: [Message!]!
    articles: [Article!]!
    
  }
  type Message {
    id: Int!
    to: User!
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
  }

type Query{
    user(email: String, id: Int): User
    messages(userId: Int): [Message]
    articles(userId: Int) : [Article]

}

schema {
    query: Query
  }


 `;
export default typeDefs;
