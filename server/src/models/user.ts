import mongoose from "mongoose"
import { IContact } from "./contact";

export interface IUser extends mongoose.Document {
    username: string;
    passwordHash: string;
    contacts?: IContact[];
}

const UserSchema = new mongoose.Schema<IUser>({
    username: { type: String, required: true, uniqie: true},
    passwordHash: { type: String, required: true },
    contacts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Contact' }]
});

export const User = mongoose.model<IUser>('User', UserSchema);
