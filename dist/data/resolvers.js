'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.resolvers = undefined;

var _sequelize = require('sequelize');

var _sequelize2 = _interopRequireDefault(_sequelize);

var _graphqlDate = require('graphql-date');

var _graphqlDate2 = _interopRequireDefault(_graphqlDate);

var _connectors = require('./connectors');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var Op = _sequelize2.default.Op;
var resolvers = exports.resolvers = {
  Date: _graphqlDate2.default,
  Query: {
    messages: function messages(_, args) {
      return _connectors.Message.findAll({
        where: args,
        order: [['createdAt', 'DESC']]
      });
    },

    userByEmail: function userByEmail(_, args) {
      return _connectors.User.findOne({ where: args });
    },
    userLogin: function userLogin(_, args) {
      return _connectors.User.findOne({ where: args });
    },
    user: function user(_, args) {
      return _connectors.User.findOne({ where: args });
    },
    users: function users(_, args) {
      return _connectors.User.findAll({
        where: args,
        order: [['createdAt', 'DESC']]
      });
    },
    articles: function articles(_, args) {
      return _connectors.Article.findAll({
        where: args,
        order: [['createdAt', 'DESC']]
      });
    },
    article: function article(_, args) {
      return _connectors.Article.findOne({ where: args });
    },
    chats: function chats(_, args) {
      return _connectors.Chat.findAll({
        where: args,
        order: [['createdAt', 'DESC']]
      });
    },
    chat: function chat(_, args) {
      return _connectors.Chat.findOne({ where: args });
    }
  },

  Mutation: {
    //  #region Users
    addUser: function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(_, args) {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                return _context.abrupt('return', _connectors.User.create(args));

              case 1:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, undefined);
      }));

      return function addUser(_x, _x2) {
        return _ref.apply(this, arguments);
      };
    }(),

    updateUser: function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(_, _ref3) {
        var _ref3$user = _ref3.user,
            id = _ref3$user.id,
            username = _ref3$user.username,
            email = _ref3$user.email;
        var userToUpdate;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                _context2.next = 3;
                return _connectors.User.find({ where: { id: id } });

              case 3:
                userToUpdate = _context2.sent;

                userToUpdate.update({ email: email, username: username });
                return _context2.abrupt('return', userToUpdate);

              case 8:
                _context2.prev = 8;
                _context2.t0 = _context2['catch'](0);
                throw new Error('React Native');

              case 11:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, undefined, [[0, 8]]);
      }));

      return function updateUser(_x3, _x4) {
        return _ref2.apply(this, arguments);
      };
    }(),

    updateUserEmail: function () {
      var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(_, _ref5) {
        var id = _ref5.id,
            email = _ref5.email;
        var userToUpdate;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.prev = 0;
                _context3.next = 3;
                return _connectors.User.find({ where: { id: id } });

              case 3:
                userToUpdate = _context3.sent;

                userToUpdate.update({ email: email });
                return _context3.abrupt('return', userToUpdate);

              case 8:
                _context3.prev = 8;
                _context3.t0 = _context3['catch'](0);
                throw new Error('Anime was a mistake');

              case 11:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, undefined, [[0, 8]]);
      }));

      return function updateUserEmail(_x5, _x6) {
        return _ref4.apply(this, arguments);
      };
    }(),

    deleteUser: function () {
      var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(_, _ref7) {
        var id = _ref7.id;
        var toDelete;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return _connectors.User.find({ where: { id: id } });

              case 2:
                toDelete = _context4.sent;

                toDelete.destroy();
                return _context4.abrupt('return', toDelete);

              case 5:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, undefined);
      }));

      return function deleteUser(_x7, _x8) {
        return _ref6.apply(this, arguments);
      };
    }(),

    //  #endregion
    //  #region Articles
    addArticle: function addArticle(_, _ref8) {
      var _this = this;

      var _ref8$article = _ref8.article,
          userId = _ref8$article.userId,
          name = _ref8$article.name,
          price = _ref8$article.price,
          description = _ref8$article.description,
          image = _ref8$article.image;
      return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                return _context5.abrupt('return', _connectors.Article.create({
                  userId: userId,
                  name: name,
                  price: price,
                  description: description,
                  image: image
                }));

              case 1:
              case 'end':
                return _context5.stop();
            }
          }
        }, _callee5, _this);
      }))();
    },


    updateDesc: function () {
      var _ref9 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(_, _ref10) {
        var id = _ref10.id,
            description = _ref10.description;
        var articleToUpdate;
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _context6.prev = 0;
                _context6.next = 3;
                return _connectors.Article.find({ where: { id: id } });

              case 3:
                articleToUpdate = _context6.sent;

                articleToUpdate.update({ description: description });
                return _context6.abrupt('return', articleToUpdate);

              case 8:
                _context6.prev = 8;
                _context6.t0 = _context6['catch'](0);
                throw new Error('The economy');

              case 11:
              case 'end':
                return _context6.stop();
            }
          }
        }, _callee6, undefined, [[0, 8]]);
      }));

      return function updateDesc(_x9, _x10) {
        return _ref9.apply(this, arguments);
      };
    }(),

    updateArticle: function updateArticle(_, _ref11) {
      var _this2 = this;

      var _ref11$article = _ref11.article,
          id = _ref11$article.id,
          name = _ref11$article.name,
          price = _ref11$article.price,
          description = _ref11$article.description,
          image = _ref11$article.image;
      return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7() {
        var articleToUpdate;
        return regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                _context7.prev = 0;
                _context7.next = 3;
                return _connectors.Article.find({ where: { id: id } });

              case 3:
                articleToUpdate = _context7.sent;

                articleToUpdate.update({
                  description: description, name: name, price: price, image: image
                });
                return _context7.abrupt('return', articleToUpdate);

              case 8:
                _context7.prev = 8;
                _context7.t0 = _context7['catch'](0);
                throw new Error('Memes');

              case 11:
              case 'end':
                return _context7.stop();
            }
          }
        }, _callee7, _this2, [[0, 8]]);
      }))();
    },


    deleteArticle: function () {
      var _ref12 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(_, _ref13) {
        var id = _ref13.id;
        var toDelete;
        return regeneratorRuntime.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                _context8.next = 2;
                return _connectors.Article.find({ where: { id: id } });

              case 2:
                toDelete = _context8.sent;

                toDelete.destroy();
                return _context8.abrupt('return', toDelete);

              case 5:
              case 'end':
                return _context8.stop();
            }
          }
        }, _callee8, undefined);
      }));

      return function deleteArticle(_x11, _x12) {
        return _ref12.apply(this, arguments);
      };
    }(),

    //  #endregion
    //  #region Chats
    addChat: function addChat(_, _ref14) {
      var _this3 = this;

      var _ref14$chat = _ref14.chat,
          ownerId = _ref14$chat.ownerId,
          buyerId = _ref14$chat.buyerId,
          articleId = _ref14$chat.articleId;
      return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9() {
        return regeneratorRuntime.wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                return _context9.abrupt('return', _connectors.Chat.create({
                  ownerId: ownerId,
                  articleId: articleId,
                  buyerId: buyerId
                }));

              case 1:
              case 'end':
                return _context9.stop();
            }
          }
        }, _callee9, _this3);
      }))();
    },

    deleteChat: function () {
      var _ref15 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee10(_, _ref16) {
        var id = _ref16.id;
        var toDelete;
        return regeneratorRuntime.wrap(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                _context10.next = 2;
                return _connectors.Chat.find({ where: { id: id } });

              case 2:
                toDelete = _context10.sent;

                toDelete.destroy();
                return _context10.abrupt('return', toDelete);

              case 5:
              case 'end':
                return _context10.stop();
            }
          }
        }, _callee10, undefined);
      }));

      return function deleteChat(_x13, _x14) {
        return _ref15.apply(this, arguments);
      };
    }(),
    //  #endregion
    //  #region Messages
    addMessage: function () {
      var _ref17 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee11(_, _ref18) {
        var message = _ref18.message;
        var x;
        return regeneratorRuntime.wrap(function _callee11$(_context11) {
          while (1) {
            switch (_context11.prev = _context11.next) {
              case 0:
                _context11.next = 2;
                return _connectors.Message.create(message);

              case 2:
                x = _context11.sent;
                return _context11.abrupt('return', x);

              case 4:
              case 'end':
                return _context11.stop();
            }
          }
        }, _callee11, undefined);
      }));

      return function addMessage(_x15, _x16) {
        return _ref17.apply(this, arguments);
      };
    }(),
    deleteMessage: function () {
      var _ref19 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee12(_, _ref20) {
        var id = _ref20.id;
        var toDelete;
        return regeneratorRuntime.wrap(function _callee12$(_context12) {
          while (1) {
            switch (_context12.prev = _context12.next) {
              case 0:
                _context12.next = 2;
                return _connectors.Message.find({ where: { id: id } });

              case 2:
                toDelete = _context12.sent;

                toDelete.destroy();
                return _context12.abrupt('return', toDelete);

              case 5:
              case 'end':
                return _context12.stop();
            }
          }
        }, _callee12, undefined);
      }));

      return function deleteMessage(_x17, _x18) {
        return _ref19.apply(this, arguments);
      };
    }()
    //  #endregion
  },

  Message: {
    to: function to(message) {
      return message.getChat();
    },
    from: function from(message) {
      return message.getUser();
    }
  },
  User: {
    chats: function chats(user) {
      return _connectors.Chat.findAll({
        where: _defineProperty({}, Op.or, [{ ownerId: user.id }, { buyerId: user.id }]),
        order: [['createdAt', 'DESC']]
      });
    },
    articles: function articles(user) {
      return _connectors.Article.findAll({
        where: { userId: user.id },
        order: [['createdAt', 'DESC']]
      });
    }
  },
  Article: {
    owner: function owner(article) {
      return article.getUser();
    },
    chats: function chats(article) {
      return _connectors.Chat.findAll({
        where: { articleId: article.id },
        order: [['createdAt', 'DESC']]
      });
    }
  },
  Chat: {
    messages: function messages(chat) {
      return _connectors.Message.findAll({
        where: { chatId: chat.id },
        order: [['createdAt', 'DESC']]
      });
    },
    buyer: function buyer(chat) {
      return chat.getBuyer();
    },
    owner: function owner(chat) {
      return chat.getOwner();
    },
    from: function from(chat) {
      return chat.getArticle();
    }
  }
};

exports.default = resolvers;