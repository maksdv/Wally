import GraphQLDate from 'graphql-date';
import { Group, Message, User } from './connectors';
 export const resolvers = {
  Date: GraphQLDate,
  Query: {
    
    messages(_, args) {
      return Message.findAll({
        where: args,
        order: [['createdAt', 'DESC']],
      });
    },
    user(_, args) {
      return User.findOne({ where: args });
    },
  },
  
  Message: {
    to(message) {
      return message.getUser();
    },
    from(message) {
      return message.getUser();
    },
  },
  User: {
    messages(user) {
      return Message.findAll({
        where: { userId: user.id },
        order: [['createdAt', 'DESC']],
      });
    },
  },
};
export default resolvers;