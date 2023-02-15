import { Document } from "mongoose";
import {ObjectId} from 'mongodb'
declare global {
    namespace Express {
        interface Request {
            currentUser?: AuthPayload;
        }
    }
}

export interface AuthPayload {
    userId: string;
    name: string;
    email:string;
    mobile: number;
}

export  interface AuthDocument extends Document {
    _id: string | ObjectId;
    name: string;
    email: string;
    mobile: number;
    createdAt: Date;
    password: string;
    comparePassword(password : string): Promise<boolean>;
    hashPassword(password: string): Promise<string>;
}

export interface ISignupData {
    _id: ObjectId;
    email: string;
    name: string;
    password: string

}