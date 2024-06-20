import mongoose from "mongoose"

export enum PhoneNumberType {
    mobile = 'mobile',
    work = 'work',
    home = 'home',
    other = 'other'
}

export interface IPhoneNumber extends mongoose.Document{
    type: PhoneNumberType;
    number: string;
}

export interface IContact extends mongoose.Document{
    firstName: string;
    lastName?: string;
    picture?: string;
    phoneNumbers: IPhoneNumber[];
    address?: string;
}

const phoneNumberSchema = new mongoose.Schema<IPhoneNumber>({
    type: { type: String, enum: Object.values(PhoneNumberType), required: true },
    number: { type: String, required: true}
})

const constactSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    phoneNumbers: { type: [phoneNumberSchema], required: true },
    lastName: String,
    picture: String,
    address: String,
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
})

export const PhoneNumber = mongoose.model<IPhoneNumber>('PhoneNumber', phoneNumberSchema);
export const Contact = mongoose.model<IContact>('Contact', constactSchema);
