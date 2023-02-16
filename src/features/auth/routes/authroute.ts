import { Router } from 'express';

import { Signup } from '@auth/controller/signup';

class AuthRoutes {
    private router: Router;

    constructor() {
        this.router = Router();
    };

    public routes(): Router {
        this.router.post('/signup', Signup.prototype.create);
        return this.router;
    };
};

export const authRoutes: AuthRoutes = new AuthRoutes();