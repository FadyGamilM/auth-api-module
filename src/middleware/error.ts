import { NextFunction, Request, Response } from "express";
import { Error } from "../interfaces/error"

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    // respond with the status from the received error, or set it to be 500 by default
    res.status(err.status || 500).json(err.message || "Something is wrong")
}