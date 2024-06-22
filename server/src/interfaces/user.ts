import { IContact } from './contact';

export interface IUser {
    username: string;
    passwordHash: string;
    email: string
    contacts?: IContact[];
}
