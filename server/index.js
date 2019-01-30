import 'babel-polyfill';

import { ApolloServer } from 'apollo-server';
import bodyParser from 'body-parser';
import express from 'express';
import multer from 'multer';
import jwt from 'express-jwt';

import { resolvers } from './data/resolvers';
import { typeDefs } from './data/schema';
import { User } from './data/connectors';

import configurationManager from './configurationManager';

import mockDB from './data/mocks';

const JWT_SECRET = configurationManager.jwt.secret;

const { port } = configurationManager.graphQL;

const app = express();
app.use(bodyParser.json());

const Storage = multer.diskStorage({
  destination(req, file, callback) {
    callback(null, './images');
  },
  filename(req, file, callback) {
    callback(null, `${file.fieldname}_${Date.now()}_${file.originalname}`);
  },
});

const upload = multer({ storage: Storage });

app.get('/', (req, res) => {
  res.status(200).send('You can post to /api/upload.');
});

app.post('/api/upload', upload.array('photo', 3), (req, res) => {
  console.log('file', req.files);
  console.log('body', req.body);
  res.status(200).json({
    message: 'success!',
  });
});

app.listen(3000, () => {
  console.log('App running on http://localhost:3000');
});

const startServer = async () => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req, res, connection }) => {
      // web socket subscriptions will return a connection
      if (connection) {
        // check connection for metadata
        return {};
      }
      const user = new Promise((resolve) => {
        jwt({
          secret: JWT_SECRET,
          credentialsRequired: false,
        })(req, res, () => {
          if (req.user) {
            resolve(User.findOne({ where: { id: req.user.id } }));
          } else {
            resolve(null);
          }
        });
      });
      return {
        user,
      };
    },
  });
  const { url } = await server.listen({ port });
  console.log(`🚀 Server ready at ${url}`);
};

const init = async () => {
  await mockDB(configurationManager.mock);
  startServer();
};

init();
