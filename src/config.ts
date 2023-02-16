import dotenv from "dotenv"
import bunyan from "bunyan"
dotenv.config({});

class Config {
    public SECRET_KEY_ONE:string | undefined;
    public SECRET_KEY_TWO:string | undefined;
    public NODE_ENV:string | undefined;
    public CLIENT_URL:string | undefined;
    public DATABASE_URL: string | undefined;


    constructor () {
        this.SECRET_KEY_ONE = process.env.SECRET_KEY_ONE;
        this.SECRET_KEY_TWO = process.env.SECRET_KEY_TWO;
        this.NODE_ENV = process.env.NODE_ENV;
        this.CLIENT_URL = process.env.CLIENT_URL;
        this.DATABASE_URL = process.env.DATABASE_URL

    }
    public createLogger(name: string): bunyan {
        return bunyan.createLogger({name, level: "debug"});

    }
}
export const config: Config = new Config