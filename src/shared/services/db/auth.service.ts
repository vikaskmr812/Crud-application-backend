import { AuthDocument } from "@auth/interface/auth.interface";
import { AuthModel } from "@auth/models/auth.schema";
import { Helpers } from "@global/helpers/helper";


class AuthService {
    public async createAuthUser(data: AuthDocument): Promise<void> {
        await AuthModel.create(data)
    };

    public async getUserByEmail(email: string): Promise<AuthDocument> {
        const user: AuthDocument = (await AuthModel.findOne({
            email: Helpers.lowerCase(email)
        }).exec()
        ) as AuthDocument;
        return user;
    }
}

export const authService: AuthService = new AuthService();

