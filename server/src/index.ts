import express, { Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors"
import mongoose from "mongoose";
import { User } from "./models/user"

dotenv.config();
const app = express();

const PORT = process.env.PORT;

app.use(cors());
mongoose

app.get("/", (request: Request, response: Response) => {
  response.status(200).send("Hello World");
});

app.listen(PORT, async () => { 
  await mongoose.connect(process.env.DATABASE_CONNECTION_STRING as string);

  console.log("Server running at PORT: ", PORT);
  // const testUser = new User({
  //   username: "Test",
  //   passwordHash: "Test",
  // });
  // await testUser.save();

  // const testUser = await User.findOne({ username: "Test" });
  // if (testUser)
  //   await testUser.deleteOne();
  
}).on("error", (error) => {
  throw new Error(error.message);
});
