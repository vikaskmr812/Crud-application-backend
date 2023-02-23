import { Request, Response } from 'express';
import HTTP_STATUS from 'http-status-codes';

import { BadRequestError } from '@global/helpers/error-handler';
import { userService } from '@service/db/user.service';

export class DeleteUser {
    public async delete(req: Request, res: Response) {
        const { userId } = req.body;
        
        if (!userId) {
            throw new BadRequestError('User ID Required' );
        }

        const user = await userService.getUserByUserId(userId);

        if (!user) {
            throw new BadRequestError('User does not exists');
        }

        userService.deleteUser(userId);

        res.status(HTTP_STATUS.OK).json({ message: `Deleted User ${user.name} successfully` });
    };
};