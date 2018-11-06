import Sequelize from 'sequelize';
import GraphQLDate from 'graphql-date';
import {
  Article, Message, User, Chat,
} from './connectors';

const { Op } = Sequelize;

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
    users(_, args) {
      return User.findAll({
        where: args,
        order: [['createdAt', 'DESC']],
      });
    },
    articles(_, args) {
      return Article.findAll({
        where: args,
        order: [['createdAt', 'DESC']],
      });
    },
    chats(_, args) {
      return Chat.findAll({
        where: args,
        order: [['createdAt', 'DESC']],
      });
    },
  },

  Mutation: {
    //  #region Users
    addUser: async (_, args) => User.create(args),
    updateUserEmail: async (_, { id, email }) => {
      try {
        const userToUpdate = await User.find({ where: { id } });
        userToUpdate.update({ email });
        return userToUpdate;
      } catch (e) {
        throw new Error('Anime was a mistake');
      }
    },
    deleteUser: async (_, { id }) => {
      const toDelete = await User.find({ where: { id } });
      toDelete.destroy();
      return toDelete;
    },
    //  #endregion
    //  #region Articles
    addArticle: async (_, args) => Article.create(args),
    updatePrice: async (_, { id, price }) => {
      try {
        const articleToUpdate = await Article.find({ where: { id } });
        articleToUpdate.update({ price });
        return articleToUpdate;
      } catch (e) {
        throw new Error('Communism');
      }
    },
    updateDesc: async (_, { id, description }) => {
      try {
        const articleToUpdate = await Article.find({ where: { id } });
        articleToUpdate.update({ description });
        return articleToUpdate;
      } catch (e) {
        throw new Error('The economy');
      }
    },
    deleteArticle: async (_, { id }) => {
      const toDelete = await Article.find({ where: { id } });
      toDelete.destroy();
      return toDelete;
    },
    //  #endregion
    //  #region Chats
    addChat: async (_, args) => Chat.create(args),
    deleteChat: async (_, { id }) => {
      const toDelete = await Chat.find({ where: { id } });
      toDelete.destroy();
      return toDelete;
    },
    //  #endregion
    //  #region Messages
    addMessage: async (_, args) => Message.create(args),
    deleteMessage: async (_, { id }) => {
      const toDelete = await Message.find({ where: { id } });
      toDelete.destroy();
      return toDelete;
    },
    //  #endregion
  },

  Message: {
    to(message) {
      return message.getChat();
    },
    from(message) {
      return message.getUser();
    },
  },
  User: {
    chats(user) {
      return Chat.findAll({
        where: { [Op.or]: [{ ownerId: user.id }, { buyerId: user.id }] },
        order: [['createdAt', 'DESC']],
      });
    },
    articles(user) {
      return Article.findAll({
        where: { userId: user.id },
        order: [['createdAt', 'DESC']],
      });
    },
  },
  Article: {
    owner(article) {
      return article.getUser();
    },
    chats(article) {
      return Chat.findAll({
        where: { articleId: article.id },
        order: [['createdAt', 'DESC']],
      });
    },
  },
  Chat: {
    messages(chat) {
      return Message.findAll({
        where: { chatId: chat.id },
        order: [['createdAt', 'DESC']],
      });
    },
    buyer(chat) {
      return chat.getBuyer();
    },
    owner(chat) {
      return chat.getOwner();
    },
    from(chat) {
      return chat.getArticle();
    },
  },
};

export default resolvers;
