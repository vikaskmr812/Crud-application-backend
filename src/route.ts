import { Application} from "express";
// const BASE PATH = "/api/v1"

export default (app: Application) => {
    const routes = () => {
        app.get('/', (_req, res) => {
            res.send("Hello World")
        })

    }
    routes();
}