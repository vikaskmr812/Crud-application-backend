import { Request, Response } from 'express';
import HTTP_STATUS from 'http-status-codes';

import { AuthDocument, ISignupData } from '@auth/interface/auth.interface';
import { authService } from '@service/db/auth.service';
import { BadRequestError } from '@global/helpers/error-handler';
import { Helpers } from '@global/helpers/helper';
import { joiValidation } from '@root/shared/decorators/joi-validation.decorators';
import { signupSchema } from '@auth/schemes/signup';

export class Signup {
    @joiValidation(signupSchema)
    public async create(req: Request, res: Response): Promise<void> {
        const { name, email, mobile, password } = req.body;
        const checkIfUserExists: AuthDocument = await authService.getUserByNameOrEmail(name, email);
        
        if (checkIfUserExists) {
            throw new BadRequestError('User already exists');
        };

        const authData: AuthDocument = Signup.prototype.signupData({
            name,
            email,
            mobile,
            password,
        });

        authService.createAuthUser(authData);

        res.status(HTTP_STATUS.CREATED).json({ message: 'user created succesfully', user: authData });
    };

    private signupData(data: ISignupData): AuthDocument {
        const { name, email, mobile, password } = data;
        return {
            name: Helpers.firstLetterUppercase(name),
            email: Helpers.lowerCase(email),
            mobile,
            password,
            createdAt: new Date()
        } as AuthDocument;
    };
};