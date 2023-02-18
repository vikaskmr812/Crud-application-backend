import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import HTTP_STATUS from 'http-status-codes';


import { config } from '@root/config';
import { joiValidation } from '@root/shared/decorators/joi-validation.decorators';
import { authService } from '@service/db/auth.service';
import { loginSchema } from '@auth/schemes/signin';
import { BadRequestError } from '@global/helpers/error-handler';
import { AuthDocument } from '@auth/interface/auth.interface';

export class SignIn {
    @joiValidation(loginSchema)
    public async read(req: Request, res: Response): Promise<void> {
        const { email, password } = req.body;
        const existingUser: AuthDocument = await authService.getUserByEmail(email);
        if (!existingUser) {
            throw new BadRequestError('Invalid Credentials');
        }

        const passwordMatch: boolean = await existingUser.comparePassword(password);

        if(!passwordMatch) {
            throw new BadRequestError('Password do not match');
        }

        const accessToken: string = jwt.sign(
            {
                'UserInfo': {
                    'name': existingUser.name
                }
            },
            config.ACCESS_TOKEN_SECRET!,
            { expiresIn: '10s' }
        );

        const refreshToken  = jwt.sign(
            { 
                'name': existingUser.name 
            },
            config.REFRESH_TOKEN_SECRET!,
            { expiresIn: '1m' }
        );

        req.session = { 'jwt': refreshToken };

        res.status(HTTP_STATUS.OK).json({ accessToken, user: existingUser });
        

    };
};