import { Request, Response, NextFunction } from "express";
import { ObjectSchema } from "joi";
import HttpError from "../utils/error.util";

export function validateRequest(schema: ObjectSchema) {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            const { error } = schema.validate(req.body, { abortEarly: true });

            if (error) {
                const errorMessage = error.details[0].message;
                return next(new HttpError(errorMessage, 400));
            }

            return next();
        } catch (error: any) {
            return next(error);
        }
    };
}
