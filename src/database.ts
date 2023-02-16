import mongoose from 'mongoose';
import Logger from 'bunyan';

import { config } from '@root/config';

const log: Logger = config.createLogger('database');

export default () => {
    mongoose.set('strictQuery', false);
    const connect = () => {
        mongoose
            .connect(`${config.DATABASE_URL}`)
            .then(() => {
                log.info('Connected to mongoDB');
            })
            .catch((error) => {
                log.error(error);
                return process.exit;
            });
    };
    connect();
    mongoose.connection.on('disconnect', connect);
};