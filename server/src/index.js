import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import mongoose from 'mongoose';
import { resolvers } from './resolvers';
import { typeDefs } from './typeDefs';
require('dotenv').config();

const DB = process.env.DB; // Database variable

const startServer = async () => { // Function that sets up a server with Apollo-Express
  const app = express();
  await mongoose.connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const server = new ApolloServer({ // Creates a new Apollo server with express
    typeDefs,
    resolvers,
  });

  server.start().then((res) => { // Starts the server at port 4000
    server.applyMiddleware({ app });
    app.listen({ port: 4000 }, () => {
      console.log(`Server ready at http://localhost:4000${server.graphqlPath}`);
    });
  });
};

startServer();
