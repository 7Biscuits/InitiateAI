import "reflect-metadata";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import MessageResolver from "./graphql/resolvers/messageResolver";
import { configDotenv } from "dotenv";

configDotenv();

async function startServer() {
  const app = express();

  const schema = await buildSchema({
    resolvers: [MessageResolver],
    emitSchemaFile: true,
  });

  const server = new ApolloServer({ schema });
  await server.start();
  server.applyMiddleware({ app });

  const PORT = process.env.PORT || 3000;

  app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}/graphql`);
  });
}

startServer();