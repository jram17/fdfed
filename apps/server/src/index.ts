import express, { Application, Request, Response } from "express";
import helmet from "helmet";
import bodyParser from "body-parser";
import cookieParser from 'cookie-parser';
import passport from 'passport';
import { env } from "./utils/env";
import { errorHandler } from "./middlewares/errorMiddleware";
class App {
    port: number | null = null;
    app: Application | null = null;
    env = env;

    constructor(port: string) {
        
        this.port = Number(port);
        this.app = express();
            
        this.app.get("/", (req: Request, res: Response) => {
            res.send("Hello from the server!");
        });
        this.setMiddleware();
    }

    server() {
        if (this.app && this.port) {
            this.app.listen(this.port, () => {
                console.log(`Server running on port ${this.port}`);
            });
        }
    }
    setMiddleware() {
        if (!this.app) return;
        this.app.use(helmet());
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(bodyParser.json());
        this.app.use(express.json());
        this.app.use(cookieParser());
        this.app.use(passport.initialize());
        this.app.use(errorHandler);
    }
}

const app = new App(env.PORT!);

export { app };
