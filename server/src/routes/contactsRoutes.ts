import express, { Request, Response } from "express";
import { Contact } from "../models/contact";

const router = express.Router();

router.post("/", async (req: Request, res: Response) => {
    try {
        const { firstName, lastName, picture, phoneNumbers, address } = req.body;

        if (!firstName || phoneNumbers.length === 0)
            res.status(400).send("You need to specify first name and one phone number to create a contact.")

        const newContact = new Contact({
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

router.get("/:id", async (req: Request, res: Response) => {
    try {
        const contactId = req.params.id;

        const contact = await Contact.findById(contactId);

        res.json({ contact: contact });
    }
    catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
    }
});

router.get("/", async (req: Request, res: Response) => {
    try {
        const contacts = await Contact.find();

        // if (contacts.length === 0)
        //     res.json({ message: "No contacts found" });

        res.json({ contacts });
    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
    }
});

router.put("/:id", async (req: Request, res: Response) => {
    try {
        const contactId = req.params.id;

        const { firstName, lastName, picture, phoneNumbers, address } = req.body;
        await Contact.findByIdAndUpdate(contactId, {
            firstName: firstName,
            lastName: lastName,
            picture: picture,
            phoneNumbers: phoneNumbers,
            address: address,
        });

        const contact = await Contact.findById(contactId);
        res.json({ contact: contact });
    }
    catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
    }
});

router.delete("/:id", async (req: Request, res: Response) => {
    try {
        const contactId = req.params.id;

        const result = await Contact.deleteOne({ _id: contactId });

        if (result.deletedCount === 0)
            return res.status(404).json({ message: "Contact not found." });

        res.json({ message: "Contact deleted successfully." });
    }
    catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
    }
});

export default router;
