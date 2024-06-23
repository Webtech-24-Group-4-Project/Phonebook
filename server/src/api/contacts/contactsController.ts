import express, { Request, Response } from "express";
import { Contact } from "../../models/contact.model";
import { User } from "../../models/user.model";
import { requireAuth } from "../../middleware/requireAuth";
import { IAuthRequest } from "../../interfaces/authRequest";

const router = express.Router();

router.post("/", requireAuth, async (req: IAuthRequest, res: Response) => {
    try {
        const { firstName, lastName, picture, phoneNumbers, address } = req.body;

        if (!firstName || phoneNumbers.length === 0) {
            res.status(400).send("You need to specify first name and one phone number to create a contact!")
        }

        const newContact = new Contact({
            firstName,
            lastName,
            picture,
            phoneNumbers,
            address,
            user: req.user,
        });

        const savedContact = await newContact.save();
        res.status(200).json(savedContact);
    }
    catch (error) {
        res.status(500).send("Server Error");
    }
});

router.get("/:id", requireAuth, async (req: IAuthRequest, res: Response) => {
    try {
        const contactId = req.params.id;

        const contact = await Contact.findById(contactId);
        if (!contact || contact.user._id.toString() !== req.userId) {
            return res.status(403).send("You are not authorized to update this contact.");
        }

        res.json({ contact: contact });
    }
    catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
    }
});

router.get("/", requireAuth, async (req: IAuthRequest, res: Response) => {
    try {
        const contacts = await Contact.find({user: req.userId});

        res.json({ contacts });
    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
    }
});

router.put("/:id", requireAuth, async (req: IAuthRequest, res: Response) => {
    try {
        const contactId = req.params.id;

        const { firstName, lastName, picture, phoneNumbers, address } = req.body;
        const contact = await Contact.findById(contactId);
        if (!contact || contact.user._id.toString() !== req.userId) {
            return res.status(403).send("You are not authorized to update this contact.");
        }
        
        contact.firstName = firstName;
        contact.lastName = lastName;
        contact.picture = picture;
        contact.phoneNumbers = phoneNumbers;
        contact.address = address;
        
        await contact.save();

        res.json({ contact: contact });
    }
    catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
    }
});

router.delete("/:id", requireAuth, async (req: IAuthRequest, res: Response) => {
    try {
        const contactId = req.params.id;

        const contact = await Contact.findById(contactId);
        if (!contact || contact.user._id.toString() !== req.userId) {
            return res.status(403).send("You are not authorized to delete this contact.");
        }

        await contact.deleteOne();

        res.json({ message: "Contact deleted successfully." });
    }
    catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
    }
});

export default router;
