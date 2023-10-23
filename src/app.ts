import "reflect-metadata";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import mongoose, { ConnectOptions } from "mongoose";
import ItemResolver from "./graphql/resolvers/ItemResolver";

async function startServer() {
  const app = express();

  await mongoose.connect("mongodb://localhost:27017/Graphql-example-db", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  } as ConnectOptions);

  const schema = await buildSchema({
    resolvers: [ItemResolver],
    // emitSchemaFile: true
  });

  const server = new ApolloServer({ schema });
  await server.start()
  server.applyMiddleware({ app });

  const PORT = process.env.PORT || 3000;

  app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}/graphql`);
  });
}

startServer();