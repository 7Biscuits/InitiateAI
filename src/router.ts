import { Router } from "express";
import session from "express-session";
import parser from "body-parser";
import { initGoogle } from "./auth/googleAuth";
import { googleCallback } from "./callback/googleAuthCallback";
import { configDotenv } from "dotenv";

configDotenv();

export const router: Router = Router();
initGoogle();
router.use(parser.json());
router.use(googleCallback);
router.use(
  session({
    secret: `${process.env.SECRET}`,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true, maxAge: 600000 },
  })
);