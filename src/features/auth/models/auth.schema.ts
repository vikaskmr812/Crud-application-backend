import {hash, compare } from 'bcryptjs';
import { model, Model, Schema } from 'mongoose';
import { AuthDocument } from '@auth/interface/auth.interface';

const SALT_ROUND = 10;
const authSchema: Schema = new Schema(
    {
        name: {type : String},
        email: {type: String},
        mobile: {type: Number},
        password: {type: String},
        createdAt: {type: Date, default: Date.now() },
        userRole: {type: String, default: 'user'}

    },
    {
        toJSON: {
            transform(_doc, ret) {
                delete ret.password;
                return ret;
            }
        }
    }
);

authSchema.pre('save', async function (this: AuthDocument, next: ()=> void){
    const hashedPassword: string = await hash(this.password as string, SALT_ROUND);
    this.password = hashedPassword;
    next();
})

authSchema.methods.comparePassword = async function (password: string): Promise<boolean> {
    const hashedPassword: string = (this as unknown as AuthDocument).password;
    return compare(password, hashedPassword);
};
authSchema.methods.comparePassword = async function (password: string): Promise<string> {
    return hash(password, SALT_ROUND)
};
const AuthModel: Model<AuthDocument> = model<AuthDocument>('Auth', authSchema, 'Auth');
export { AuthModel}
