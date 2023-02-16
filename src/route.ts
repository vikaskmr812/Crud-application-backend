import { Application } from 'express';

import { authRoutes } from '@auth/routes/authroute';


export default (app: Application) => {
  const routes = () => {
    app.use(authRoutes.routes());
  };
  routes();
};