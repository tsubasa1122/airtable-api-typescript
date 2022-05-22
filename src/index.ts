import express, { Request, Response } from "express";
import Router from "express-promise-router";
import cors from "cors";
import dotenv from "dotenv";
import { HttpClient } from "./infrastructure/api/httpClient";
import { UserRepository } from "./repository/airtable/userRepository";

dotenv.config();
const app = express();
const router = Router();
const PORT = 8000;

app.use(express.json());
// eslint-disable-next-line @typescript-eslint/no-unsafe-call
app.use(cors());

router.get("/", (_, res: Response) => res.send("ok!!"));

router.get("/users", async (_, res: Response) => {
  console.log(process.env.AIRTABLE_API_KEY);
  const httpClient = new HttpClient();
  const userRepository = new UserRepository(httpClient);
  const users = await userRepository.getAll();

  res.json(users);
});

app.use(router);
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
