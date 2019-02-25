import { ForbiddenError } from 'apollo-server';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Sequelize from 'sequelize';
import GraphQLDate from 'graphql-date';
import {
  Article, Message, User, Chat,
} from './connectors';
import configurationManager from '../configurationManager';

const JWT_SECRET = configurationManager.jwt.secret;

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
    async addUser(_, { user: { username, email, password } }) {
      return User.create({
        username,
        email,
        password,
      });
    },

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
    editUser(
      _,
      {
        user: {
          id, username, email,
        },
      },
    ) {
      return User.findOne({ where: { id } }).then(user => user.update({
        username,
        email,
      }));
    },
    
    //  #endregion
    //  #region Articles
    async addArticle(_, {
      article: {
        userId, name, price, description, image, location,
      },
    }) {
      return Article.create({
        userId,
        name,
        price,
        description,
        image,
        location,
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
        id, name, price, description, image, location,
      },
    }) {
      try {
        const articleToUpdate = await Article.find({ where: { id } });
        articleToUpdate.update({
          description, name, price, image, location,
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
      try {
        const newArticle = await Chat.create({
          ownerId,
          articleId,
          buyerId,
        });
        console.log(newArticle);
        return newArticle;
      } catch (e) {
        console.log(e);
        return null;
      }
    },
    deleteChat: async (_, { id }) => {
      const toDelete = await Chat.find({ where: { id } });
      toDelete.destroy();
      return toDelete;
    },
    //  #endregion
    //  #region Messages
    addMessage: async (_, { message }, ctx) => {
      if (!ctx.user) {
        throw new ForbiddenError('Unauthorized');
      }
      return ctx.user.then((user) => {
        if (!user) {
          throw new ForbiddenError('Unauthorized');
        }
        try {
          const newMessage = Message.create(
            {
              chatId: message.chatId,
              userId: message.userId,
              text: message.text,
            },
          );
          return newMessage;
        } catch (e) {
          return null;
        }
      });
    },

    deleteMessage: async (_, { id }) => {
      const toDelete = await Message.find({ where: { id } });
      toDelete.destroy();
      return toDelete;
    },
    //  #endregion

    login(_, { email, password }, ctx) {
      // find user by email
      return User.findOne({ where: { email } }).then((user) => {
        if (user) {
          // validate password
          return bcrypt.compare(password, user.password).then((res) => {
            if (res) {
              // create jwt
              const token = jwt.sign(
                {
                  id: user.id,
                  email: user.email,
                },
                JWT_SECRET,
              );
              ctx.user = Promise.resolve(user);
              user.jwt = token; // eslint-disable-line no-param-reassign
              return user;
            }
            return Promise.reject(new Error('password incorrect'));
          });
        }
        return Promise.reject(new Error('email not found'));
      });
    },

    signup(_, { email, password, username }, ctx) {
      return User.findOne({ where: { email } }).then((existing) => {
        if (!existing) {
          console.log(ctx, "popopo", password);
          // hash password and create user
          return bcrypt
            .hash(password, 10)
            .then(hash => User.create({
              email,
              password: hash,
              username: username || email,
            }))
            .then((user) => {
              console.log(ctx, "...............");
              const { id } = user;
              const token = jwt.sign({ id, email }, JWT_SECRET);
              ctx.user = Promise.resolve(user);
              user.jwt = token; // eslint-disable-line no-param-reassign
              return user;
            })
            .catch(error => console.log(error, ">>>>>>>>>>>>"))
        }
        return Promise.reject(new Error('email already exists')); // email already exists
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
    /* articles(user, { articleConnection = {} }) {
      const { first, after } = articleConnection;

      // base query -- get messages from the right chat
      const where = { userId: user.id };

      // because we return messages from newest -> oldest
      // after actually means older (id < cursor)

      if (after) {
        where.id = { $lt: Buffer.from(after, 'base64').toString() };
      }

      return Article.findAll({
        where,
        order: [['id', 'DESC']],
        limit: first,
      }).then((articles) => {
        const edges = articles.map(article => ({
          cursor: Buffer.from(article.id.toString()).toString('base64'), // convert id to cursor
          node: article, // the node is the message itself
        }));

        return {
          edges,
          pageInfo: {
            hasNextPage() {
              if (articles.length < first) {
                return Promise.resolve(false);
              }

              return Article.findOne({
                where: {
                  userId: user.id,
                  id: {
                    $lt: article[article.length - 1].id,
                  },
                },
                order: [['id', 'DESC']],
              }).then(article => !!article);
            },
            hasPreviousPage() {
              return Article.findOne({
                where: {
                  userId: user.id,
                  id: where.id,
                },
                order: [['id']],
              }).then(article => !!article);
            },
          },
        };
      });
    }, */
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
    messages(chat, { messageConnection = {} }) {
      const { first, after } = messageConnection;

      // base query -- get messages from the right chat
      const where = { chatId: chat.id };

      // because we return messages from newest -> oldest
      // after actually means older (id < cursor)

      if (after) {
        where.id = { $lt: Buffer.from(after, 'base64').toString() };
      }

      return Message.findAll({
        where,
        order: [['id', 'DESC']],
        limit: first,
      }).then((messages) => {
        const edges = messages.map(message => ({
          cursor: Buffer.from(message.id.toString()).toString('base64'), // convert id to cursor
          node: message, // the node is the message itself
        }));

        return {
          edges,
          pageInfo: {
            hasNextPage() {
              if (messages.length < first) {
                return Promise.resolve(false);
              }

              return Message.findOne({
                where: {
                  chatId: chat.id,
                  id: {
                    $lt: messages[messages.length - 1].id,
                  },
                },
                order: [['id', 'DESC']],
              }).then(message => !!message);
            },
            hasPreviousPage() {
              return Message.findOne({
                where: {
                  chatId: chat.id,
                  id: where.id,
                },
                order: [['id']],
              }).then(message => !!message);
            },
          },
        };
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