import Sequelize from 'sequelize';
// initialize our database
const db = new Sequelize('wally', null, null, {
  dialect: 'sqlite',
  storage: './wally.sqlite',
  logging: true, // mark this true if you want to see logs
});
// define articles
const ArticleModel = db.define('article', {
  name: { type: Sequelize.STRING },
  price: { type: Sequelize.INTEGER },
  description: { type: Sequelize.STRING },
  image: { type: Sequelize.STRING },
  location: { type: Sequelize.STRING },
});
// define messages
const MessageModel = db.define('message', {
  text: { type: Sequelize.STRING },
});
// define users
const UserModel = db.define('user', {
  email: { type: Sequelize.STRING },
  username: { type: Sequelize.STRING },
  password: { type: Sequelize.STRING },
});
const ChatModel = db.define('chat', {

});
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

const Article = db.models.article;
const Message = db.models.message;
const User = db.models.user;
const Chat = db.models.chat;
export {
  db, Article, Message, User, Chat,
};
