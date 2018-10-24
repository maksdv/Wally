import Sequelize from 'sequelize';
// initialize our database
const db = new Sequelize('chatty', null, null, {
  dialect: 'sqlite',
  storage: './chatty.sqlite',
  logging: false, // mark this true if you want to see logs
});
// define articles
const ArticleModel = db.define('article', {
  name: { type: Sequelize.STRING },
  price: { type: Sequelize.INTEGER },
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
// messages are sent from users
MessageModel.belongsTo(UserModel);
// articles belong to users
ArticleModel.belongsTo(UserModel);
const Article = db.models.article;
const Message = db.models.message;
const User = db.models.user;
export {
  db, Article, Message, User,
};
