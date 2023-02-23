import { Helpers } from '@global/helpers/helper';
import { IUserDocument } from '@user/interface/user.interface';
import { UserModel } from '@user/models/user.schema';
import { ObjectId } from 'mongodb';

class UserService {
    public async createAuthUser(data: IUserDocument): Promise<void> {
        await UserModel.create(data);
    };

    public async getUserByEmail(email: string): Promise<IUserDocument> {
        const user: IUserDocument = (await UserModel.findOne({
            email: Helpers.lowerCase(email)
        }).exec()
        ) as IUserDocument;
        return user;
    };
    
    public async getUserByUserId(userId: ObjectId): Promise<IUserDocument> {
        const user: IUserDocument = (await UserModel.findOne({
            _id: userId 
        }).exec()
        ) as IUserDocument;
        return user;
    };
    
    public async deleteUser(userId: ObjectId) {
        const user = await UserModel.deleteOne({ _id: userId }).exec();
        return user;
    };
};

export const userService: UserService = new UserService();