import express, { Request, RequestHandler, Response } from "express";
import Router from "express-promise-router";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
const app = express();
const router = Router();
const PORT = 8000;

app.use(express.json());
// eslint-disable-next-line @typescript-eslint/no-unsafe-call
app.use(cors());

router.get("/", (_, res: Response) => res.send("ok!!"));

// TODO:
router.get("", (async (req: Request, res: Response) => {}) as RequestHandler);

app.use(router);
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
