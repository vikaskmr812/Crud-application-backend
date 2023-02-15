import { AuthDocument } from "@auth/interface/auth.interface";
import { AuthModel } from "@auth/models/auth.schema";
import { Helpers } from "@global/helpers/helper";


class AuthService {
    public async createAuthUser(data: AuthDocument): Promise<void> {
        await AuthModel.create(data)
    };

    public async getUserByNameOrEmail(name: string, email: string): Promise<AuthDocument> {
        const query = {
            $or: [{ name: Helpers.firstLetterUppercase(name)}, {email: Helpers.lowerCase(email) }]
        };
        const user: AuthDocument = (await AuthModel.findOne(query).exec()) as AuthDocument;
        return user;
    } 
}

export const authService: AuthService = new AuthService();
