import { Request, Response } from 'express';
import HTTP_STATUS from 'http-status-codes';

import { AuthDocument, ISignupData } from '@auth/interface/auth.interface';
import { authService } from '@service/db/auth.service';
import { BadRequestError } from '@global/helpers/error-handler';
import { Helpers } from '@global/helpers/helper';
import { joiValidation } from '@root/shared/decorators/joi-validation.decorators';
import { signupSchema } from '@auth/schemes/signup';
import { mailTransport } from '@service/mail/mail-transport';
import { passwordTemplate } from '@service/mail/template/password.template';

export class Signup {
    @joiValidation(signupSchema)
    public async create(req: Request, res: Response): Promise<void> {
        const { name, email, mobile } = req.body;
        const password = Helpers.generateRandomPassword();
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
        const template: string = passwordTemplate.generatePasswordTemplate(name, password);
        mailTransport.send(email, 'Here\'s your password', template);
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