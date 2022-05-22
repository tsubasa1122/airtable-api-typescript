import express, { Request, Response } from "express";
import Router from "express-promise-router";
import cors from "cors";
import dotenv from "dotenv";
import { HttpClient } from "./infrastructure/api/httpClient";
import { UserRepository } from "./repository/airtable/userRepository";
import User from "./model/airtable/user";

dotenv.config();
const app = express();
const router = Router();
const PORT = 8000;

const httpClient = new HttpClient();

app.use(express.json());
// eslint-disable-next-line @typescript-eslint/no-unsafe-call
app.use(cors());

router.get("/", (_, res: Response) => res.send("ok!!"));

router.get("/users", async (_, res: Response) => {
  const userRepository = new UserRepository(httpClient);
  const users = await userRepository.getAll();

  res.json(users);
});

router.post("/users", async (req: Request, res: Response) => {
  const usersParams = req.body as { users: { name: string; age: number }[] };
  const userRepository = new UserRepository(httpClient);
  try {
    const users = usersParams.users.map((userParam) =>
      User.build(userParam.name, userParam.age)
    );
    userRepository.insert(users);
    res.json("データを登録しました。");
  } catch (e) {
    console.log(e);
    res.status(400).json({ message: "不正なリクエストです。" });
  }
});

app.use(router);
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
