import express, { Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors"
import mongoose from "mongoose";
import contactsController from "./api/contactsController";

dotenv.config();

const PORT = process.env.PORT;

const app = express();
app.use(express.json());
app.use(cors());
app.use("/contacts", contactsController);

app.listen(PORT, async () => {
  await mongoose.connect(process.env.DATABASE_CONNECTION_STRING as string);

  console.log("Server running at PORT: ", PORT);
}).on("error", (error) => {
  throw new Error(error.message);
});
