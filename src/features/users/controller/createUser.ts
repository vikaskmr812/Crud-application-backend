import { Request, Response } from "express";
import HTTP_STATUS from "http-status-codes";


import { BadRequestError } from "@global/helpers/error-handler";
import { joiValidation } from "@root/shared/decorators/joi-validation.decorators";
import { ICreatedUserData, IUserDocument } from "@user/interface/user.interface";
import { userSchema } from '@user/schemes/user';
import { Helpers } from "@global/helpers/helper";
import { mailTransport } from "@service/mail/mail-transport";
import { passwordTemplate } from "@service/mail/template/password.template";
import { userService } from '@service/db/user.service'







// import { joiValidation } from "@root/shared/decorators/joi-validation.decorators";
// import { userSchema } from "../schemes/user";

export class CreateUser {
    @joiValidation(userSchema)
    public async create(req: Request, res: Response): Promise<void> {
        const  { name , email, mobile, roles } = req.body;

        const existingUser: IUserDocument = await userService.getUserByEmail(email);
        if(existingUser) {
            throw new BadRequestError('User already exists');
        }
        const userData: IUserDocument = CreateUser.prototype.userData({
            name,
            email,
            mobile,
            roles,
        });

        const password = Helpers.generateRandomPassword();

        const template: string = passwordTemplate.generatePasswordTemplate(name, password);

        mailTransport.send(email, 'Here\'s your password', template);

        userService.createAuthUser(userData);

        res.status(HTTP_STATUS.CREATED).json({ message: 'User succesfully created' });
    };

    private userData(data: ICreatedUserData): IUserDocument {
        const { name, email, mobile, roles } = data;
        if(roles) {
            return { name: Helpers.firstLetterUppercase(name),
            email: Helpers.lowerCase(email),
            mobile,
            roles,
            createdAt: new Date(),
        } as IUserDocument;
    
        }
    return {
        name:Helpers.firstLetterUppercase(name),
        email: Helpers.lowerCase(email),
        mobile,
        createdAt: new Date(),
    } as IUserDocument;
    }
}