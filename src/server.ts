import express, { Application, Request, Response } from "express";

import { envConfig } from "./config";

import { errorHandler } from "./middleware/error";
import morgan from "morgan";

//! connect to the database and setup the connection pool
import { connect_to_db } from "./database/connection";

//! import rate-limiter middleware
import RateLimit from "express-rate-limit";

const app: Application = express();

//! parse the incoming requests
app.use(express.json());

//! use morgan logger middleware
app.use(morgan("common"));

//! use the rate limit middleware
app.use(
    RateLimit({
        windowMs: 15 * 60 * 1000, // 200 requests from the same IP each 15 mins
        max: 200,
        standardHeaders: true,
        legacyHeaders: false,
        message: "too many requests from th IP address, try again after 15 mins !",
    })
);


// !to manage the order of setup, we will connect to the databasea, then bootstrap the server
(
    async () => {

        await connect_to_db()


        app.get("/", (req: Request, res: Response) => {
            return res.sendStatus(200);
        });

        //! handle the 404 not found error
        app.use((_req: Request, res: Response) => {
            return res.status(404).json({
                mesage: "Not Found, Make sure you hit the right url",
            });
        });

        app.use(errorHandler);

        const PORT = envConfig.envVars.PORT || 5050;

        app.listen(PORT, () => {
            console.log("app is up and running");
        });
    }
)()