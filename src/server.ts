import Logger from 'bunyan';
import { Application, urlencoded, json, Request, Response, NextFunction } from 'express';
import http from 'http';
import cors from 'cors';
import cookieSession from 'cookie-session';
import hpp from 'hpp';
import helmet from 'helmet';
import compression from 'compression'
import HTTP_STATUS from 'http-status-codes'


import { config } from '@root/config';
import applicationRoutes from '@root/route';
import {CustomError, ErrorResponse} from '@global/helpers/error-handler'

const PORT = 5500;

const log: Logger = config.createLogger('server');

export class Server {
    private app: Application;

    constructor(app: Application) {
        this.app = app;
    }

  public start(): void {
    this.securityMiddleware(this.app);
    this.standardMiddleware(this.app);
    this.routeMiddleware(this.app);
    this.globalErrorHandler(this.app);
    this.startServer(this.app);
  }

  private securityMiddleware(app: Application): void {
    app.use(cookieSession({
      name: 'session',
      keys: [config.SECRET_KEY_ONE!, config.SECRET_KEY_TWO!],
      maxAge: 24 * 7 * 3600,
      secure: config.NODE_ENV !== 'development'
    })
    );
    app.use(hpp());
    app.use(helmet());
    app.use(cors({
      origin: config.CLIENT_URL,
      credentials: true,
      optionsSuccessStatus: 200,
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
    }));
  };

  private standardMiddleware(app: Application): void {
    app.use(compression());
    app.use(json({limit: '50mb'}))
    app.use(urlencoded({ extended: true, limit: '50mb' }));
  };

  private routeMiddleware(app: Application) {
    applicationRoutes(app);
  };

  private globalErrorHandler(app: Application):void {
    app.all('*', (req:Request, res: Response) => {
        res.status(HTTP_STATUS.NOT_FOUND).json({message: `${req.originalUrl}not found`})
    })
    app.use((error:ErrorResponse, _req:Request, res:Response, next:NextFunction) =>{
        if(error instanceof CustomError) {
            res.status(error.statusCode).json(error.serializeErrors());
        }
        next();
    })
  };

  private  startServer(app: Application): void {
    try {
        const httpServer: http.Server = new http.Server(app);
        this.startHttpServer(httpServer);
    } catch (error) {
        log.error(error);
    }
  };

  private startHttpServer(httpServer: http.Server): void {
    log.info(`Starting server with process ${process.pid}`);
    httpServer.listen(PORT, () => {
      log.info(`listening in port ${PORT}`);
    });
  }

};