import express, { Application, Request, Response } from "express";
import { errorHandler } from "./middleware/error";
import morgan from "morgan";

// import rate-limiter middleware
import RateLimit from "express-rate-limit";

const app: Application = express();

// parse the incoming requests
app.use(express.json());

// use morgan logger middleware
app.use(morgan("common"));

// use the rate limit middleware
app.use(
    RateLimit({
        windowMs: 15 * 60 * 1000, // 200 requests from the same IP each 15 mins
        max: 200,
        standardHeaders: true,
        legacyHeaders: false,
        message: "too many requests from th IP address, try again after 15 mins !",
    })
);

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

const PORT = 5050;

app.listen(PORT, () => {
    console.log("app is up and running");
});
