import express, { Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors"

dotenv.config();
const app = express();

const PORT = process.env.PORT;

app.use(cors());

app.get("/", (request: Request, response: Response) => {
  response.status(200).send("Hello World");
});

app.listen(PORT, () => { 
  console.log("Server running at PORT: ", PORT); 
}).on("error", (error) => {
  throw new Error(error.message);
});
