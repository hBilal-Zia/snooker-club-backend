import { Request, Response, NextFunction } from "express";
import { ObjectSchema } from "joi";
import { failureApiResponse } from "../utils/response.util";
import HttpError from "../utils/error.util";

export function validateRequest(schema: ObjectSchema) {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            const { error } = schema.validate(req.body, { abortEarly: false });

        if (error) {
            const errorMessage = error.details[0].message;
            // const errorMessages = error.details.map((d) => d.message).join(", ");
            next(new HttpError(errorMessage, 400))
        }

        next();
        } catch (error: any) {
            next(error)
        }
    };
}
