import R from 'ramda';
import faker from 'faker';
import { db } from './connectors';
import { race } from 'async';

// create fake starter data
const USERS = 5;
const ARTICLES_PER_USER = 2;
const MESSAGES_PER_CHAT = 2;
const CHATS_PER_ARTICLE = 2;

faker.seed(123); // get consistent data every time we reload app

// you don't need to stare at this code too hard
// just trust that it fakes a bunch of groups, users, and messages

const randomUser = async (ammount, self) => {
  console.log('loop');
  const hoy = Math.floor((Math.random() * (ammount)) + 1);
  return (hoy !== self) ? hoy : randomUser(ammount, self);
};

const mockDB = async ({ populating = true, force = true } = {}) => {
  console.log('creating database....');
  await db.sync({ force });

  if (!populating) {
    return Promise.resolve(true);
  }

  console.log('Populating users');
  const users = await Promise.all(
    R.times(async () => {
      const user = await db.models.user.create({
        username: faker.internet.userName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
      });
      R.times(async () => {
        const article = await db.models.article.create({
          name: faker.internet.color(),
          price: Math.floor(Math.random()*201),
          description: faker.lorem.sentences(4),
          userId: user.id,
        });
        R.times(async () => {
          const buyer = await randomUser(USERS+1,user.id)
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
