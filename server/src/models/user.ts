import mongoose from "mongoose"
import { IContact } from "./contact";

export interface IUser extends mongoose.Document {
    username: String;
    passwordHash: String;
    contacts?: IContact[];
}

const schema = new mongoose.Schema<IUser>({
    username: { type: String, required: true },
    passwordHash: { type: String, required: true },
    contacts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Contact' }]
});

export const User = mongoose.model<IUser>('User', schema);
