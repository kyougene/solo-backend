import express from "express";
import type { Request, Response } from "express";
import { userRouter } from "./user/user.router.js";
import { PrismaSessionStore } from "@quixo3/prisma-session-store";
import prisma from "./db.js";
import "../custom.d.js";
import session from "express-session";

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(
  session({
    store: new PrismaSessionStore(prisma, {
      checkPeriod: 2 * 60 * 1000, //ms
      dbRecordIdIsSessionId: true,
      dbRecordIdFunction: undefined,
    }),
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

app.get("/", (req: Request, res: Response) => {
  res.send("hello");
});

app.use("/users", userRouter);

app.listen(PORT, () => {
  console.log(`now listening on ${PORT}`);
});
