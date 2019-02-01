import R from 'ramda';
import faker from 'faker';
import { db } from './connectors';
import bcrypt from 'bcrypt';


// create fake starter data
const USERS = 5;
const ARTICLES_PER_USER = 3;
const MESSAGES_PER_CHAT = 10;
const CHATS_PER_ARTICLE = 1;

faker.seed(123); // get consistent data every time we reload app

// you don't need to stare at this code too hard
// just trust that it fakes a bunch of groups, users, and messages

const randomUser = async (ammount, self) => {
  const hoy = Math.floor((Math.random() * (ammount)) + 1);
  return (hoy !== self) ? hoy : randomUser(ammount, self);
};

const mockDB = async ({ populating = false, force = false } = {}) => {
  console.log('creating database....');
  await db.sync({ force });

  if (!populating) {
    return Promise.resolve(true);
  }

  console.log('Populating users');
  const users = await Promise.all(
    R.times(async () => {
      const email = faker.internet.email();
      const password = await bcrypt.hash(email, 10);
      console.log('password: ', password);
      const user = await db.models.user.create({
        username: faker.internet.userName(),
        email,
        password,
      });
      R.times(async () => {
        const article = await db.models.article.create({
          name: faker.commerce.productName(),
          price: Math.floor(Math.random() * 201),
          image: faker.image.avatar(),
          description: faker.lorem.sentences(4),
          userId: user.id,
        });
        R.times(async () => {
          const buyer = await randomUser(USERS + 1, user.id);
          const chat = await db.models.chat.create({
            articleId: article.id,
            ownerId: user.id,
            buyerId: buyer,
          });
          R.times(
            () => db.models.message.create({
              chatId: chat.id,
              userId: user.id,
              
              text: faker.hacker.phrase(),
            }),
            MESSAGES_PER_CHAT,
          );
          R.times(
            () => db.models.message.create({
              chatId: chat.id,
              userId: buyer,
              
              text: faker.hacker.phrase(),
            }),
            MESSAGES_PER_CHAT,
          );
        },
        CHATS_PER_ARTICLE);
      },
      ARTICLES_PER_USER);
      return user;
    },
    USERS),
  );

  console.log('limpito');
  console.log('¡DATABASE CREATED!');
};

export default mockDB;
