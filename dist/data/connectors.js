'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Chat = exports.User = exports.Message = exports.Article = exports.db = undefined;

var _sequelize = require('sequelize');

var _sequelize2 = _interopRequireDefault(_sequelize);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// initialize our database
var db = new _sequelize2.default('wally', null, null, {
  dialect: 'sqlite',
  storage: './wally.sqlite',
  logging: true // mark this true if you want to see logs
});
// define articles
var ArticleModel = db.define('article', {
  name: { type: _sequelize2.default.STRING },
  price: { type: _sequelize2.default.INTEGER },
  description: { type: _sequelize2.default.STRING },
  image: { type: _sequelize2.default.STRING }
});
// define messages
var MessageModel = db.define('message', {
  text: { type: _sequelize2.default.STRING }
});
// define users
var UserModel = db.define('user', {
  email: { type: _sequelize2.default.STRING },
  username: { type: _sequelize2.default.STRING },
  password: { type: _sequelize2.default.STRING }
});
var ChatModel = db.define('chat', {});
// messages are sent from users
MessageModel.belongsTo(UserModel);
// messages are sents to chats
MessageModel.belongsTo(ChatModel);
// chats belong to articles
ChatModel.belongsTo(ArticleModel);
// chats belong to users
ChatModel.belongsTo(UserModel, { as: 'owner' });
ChatModel.belongsTo(UserModel, { as: 'buyer' });
// articles belong to users
ArticleModel.belongsTo(UserModel);

var Article = db.models.article;
var Message = db.models.message;
var User = db.models.user;
var Chat = db.models.chat;
exports.db = db;
exports.Article = Article;
exports.Message = Message;
exports.User = User;
exports.Chat = Chat;