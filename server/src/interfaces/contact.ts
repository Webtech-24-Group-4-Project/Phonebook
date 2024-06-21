export enum PhoneNumberType {
    mobile = 'mobile',
    work = 'work',
    home = 'home',
    other = 'other'
}

export interface IPhoneNumber {
    type: PhoneNumberType;
    number: string;
}

export interface IContact {
    firstName: string;
    lastName?: string;
    picture?: string;
    phoneNumbers: IPhoneNumber[];
    address?: string;
}