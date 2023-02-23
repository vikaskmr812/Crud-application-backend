import { IUserDocument } from '../interface/user.interface';
import { model, Model, Schema } from 'mongoose';

const userSchema: Schema = new Schema(
    {
        name: { type: String },
        email: { type: String },
        mobile: { type: Number },
        createdAt: { type: Date, default: Date.now() },
        roles: { type: Array, default: ['user'] }
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



const UserModel: Model<IUserDocument> = model<IUserDocument>('Auth', userSchema, 'Auth');
export { UserModel };