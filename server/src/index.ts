import express, { Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors"
import mongoose from "mongoose";
import { User } from "./models/user"
import { Contact } from "./models/contact";

dotenv.config();

const app = express();
app.use(express.json());

const PORT = process.env.PORT;

app.use(cors());

app.get("/", (request: Request, response: Response) => {
  response.status(200).send("Hello World");
});

app.post("/contacts", async (req: Request, res: Response) => {
  try {
  const { firstName, lastName, picture, phoneNumbers, address } = req.body;
  
  if (!firstName || phoneNumbers.length === 0)
    res.status(400).send("You need to specify first name and one phone number to create a contact.")
  
  const newContact = new Contact ({
    firstName,
    lastName,
    picture,
    phoneNumbers,
    address
  });

  const savedContact = await newContact.save();
  res.status(200).json(savedContact);
  }
  catch (error) {
    res.status(500).send("Server Error");
  }
});

app.get("/contacts/:id", async (req: Request, res: Response) => {
  try {
    const contactId = req.params.id;
  
    const contact = await Contact.findById(contactId);
    
    // if (!contact)
    //   res.json({ message: "No such contacts found" });

    res.json({ contact: contact });
  }
  catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

app.get("/contacts", async (req: Request, res: Response) => {
  try {
    const contacts = await Contact.find();

    if (contacts.length === 0)
      res.json({ message: "No contacts found" });

    res.json({ contacts });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
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
