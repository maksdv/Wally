import Sequelize from 'sequelize';
import GraphQLDate from 'graphql-date';
import {
  Article, Message, User, Chat,
} from './connectors';

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
      return Sequelize.query(
        'SELECT * FROM `chats` WHERE chats.userId = :value OR chats.articleId IN ( SELECT articles.id FROM articles WHERE articles.userId = :value)',
        { replacements: { value: user.id }, model: Chat },
      ).then(() => {

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
        where: { to: chat.id },
        order: [['createdAt', 'DESC']],
      });
    },
    buyer(chat) {
      return chat.getBuyer();
    },
    from(chat) {
      return chat.getArticle();
    },
  },
};

export default resolvers;
