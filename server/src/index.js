import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import mongoose from 'mongoose';
import { resolvers } from './resolvers';
import { typeDefs } from './typeDefs';
import { User } from './models/User';
require('dotenv').config();

const DB = process.env.DB;

const startServer = async () => {
  const app = express();
  await mongoose.connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  server.start().then((res) => {
    server.applyMiddleware({ app });
    app.listen({ port: 4000 }, () => {
      console.log(`Server ready at http://localhost:4000${server.graphqlPath}`);
    });
  });
};

startServer();
