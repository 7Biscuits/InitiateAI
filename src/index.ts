import "reflect-metadata";
import express, { Express } from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { json } from "body-parser";
import cookieParser from "cookie-parser";
import session from "express-session";
import mongoose, { ConnectOptions } from "mongoose";
import cors from "cors";
import { UserResolver } from "./resolvers/user/user.resolver";
import { IdeaResolver } from "./resolvers/idea/idea.resolver";
import { QuestionResolver } from "./resolvers/question/question.resolver";
import { RoadmapResolver } from "./resolvers/roadmap/roadmap.resolver";
import { router } from "./router";
import { configDotenv } from "dotenv";

configDotenv();

async function startServer() {
  const app: Express = express();

  await mongoose.connect(`${process.env.MONGO_URI}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  } as ConnectOptions);

  app.use(
    cors({
      credentials: true,
      origin: "*",
      methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
      preflightContinue: true,
      optionsSuccessStatus: 204,
    })
  );

  app.use(
    session({
      secret: `${process.env.SECRET}`,
      resave: false,
      saveUninitialized: true,
      cookie: { secure: true, maxAge: 600000 },
    })
  );

  app.use(cookieParser());
  app.use(express.json());

  const schema: any = await buildSchema({
    resolvers: [UserResolver, IdeaResolver, QuestionResolver, RoadmapResolver],
    emitSchemaFile: true,
  });

  const server: ApolloServer = new ApolloServer({
    schema,
    context: ({ req, res }) => ({
      req,
      res,
    }),
  });
  await server.start();
  server.applyMiddleware({ app });

  app.use("/graphql", cors<cors.CorsRequest>(), json());
  app.use(router);

  const PORT = process.env.PORT || 8080;

  app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}/graphql`);
  });
}

startServer();