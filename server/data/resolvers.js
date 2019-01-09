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
    userByEmail: (_, args) => User.findOne({ where: args }),
    userLogin: (_, args) => User.findOne({ where: args }),
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
    article(_, args) {
      return Article.findOne({ where: args });
    },
    chats(_, args) {
      return Chat.findAll({
        where: args,
        order: [['createdAt', 'DESC']],
      });
    },
    chat(_, args) {
      return Chat.findOne({ where: args });
    },
  },

  Mutation: {
    //  #region Users
    addUser: async (_,args)=> User.create(args),

    updateUser: async (_, { user: { id, username, email } }) => {
      try {
        const userToUpdate = await User.find({ where: { id } });
        userToUpdate.update({ email, username });
        return userToUpdate;
      } catch (e) {
        throw new Error('React Native');
      }
    },

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
    async addArticle(_, {
      article: {
        userId, name, price, description, image,
      },
    }) {
      return Article.create({
        userId,
        name,
        price,
        description,
        image,
      });
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

    async updateArticle(_, {
      article: {
        id, name, price, description, image,
      },
    }) {
      try {
        const articleToUpdate = await Article.find({ where: { id } });
        articleToUpdate.update({
          description, name, price, image,
        });
        return articleToUpdate;
      } catch (e) {
        throw new Error('Memes');
      }
    },

    deleteArticle: async (_, { id }) => {
      const toDelete = await Article.find({ where: { id } });
      toDelete.destroy();
      return toDelete;
    },

    //  #endregion
    //  #region Chats
    async addChat(_, { chat: { ownerId, buyerId, articleId } }) {
      return Chat.create({
        ownerId,
        articleId,
        buyerId,
      });
    },
    deleteChat: async (_, { id }) => {
      const toDelete = await Chat.find({ where: { id } });
      toDelete.destroy();
      return toDelete;
    },
    //  #endregion
    //  #region Messages
    addMessage: async (_, { message }) => {
      const x = await Message.create(message);
      return x;
    },
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