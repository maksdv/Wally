import R from 'ramda';
import faker from 'faker';
import { db } from './connectors';

// create fake starter data
const USERS = 5;
const ARTICLES_PER_USER = 2;
const MESSAGES_PER_CHAT = 2;
const CHATS_PER_ARTICLE = 2;

faker.seed(123); // get consistent data every time we reload app

// you don't need to stare at this code too hard
// just trust that it fakes a bunch of groups, users, and messages
const randomUser = (arr, self) => {
  const hoy = Math.random(arr.length());
  return (arr[hoy] !== self) ? arr[hoy] : randomUser(arr, self);
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
          price: Math.random(100, 200),
          userId: user.id,
        });
        R.times(async () => {
          const chat = await db.models.chat.create({
            articleId: article.id,
          });
          R.times(
            () => db.models.message.create({
              chatId: chat.id,
              userId: user.id,
              text: faker.lorem.sentences(3),
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
  await Promise.all(
    R.flatten(
      R.map(uMap => uMap.getArticles().then(artMap => artMap.getChats().map(current => current.setBuyer(randomUser(users, uMap))), users),
      ),
    ),
  );
  console.log('¡DATABASE CREATED!');
};

export default mockDB;
