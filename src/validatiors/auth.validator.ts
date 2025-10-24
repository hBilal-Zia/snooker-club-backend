import Joi from "joi";
import { LoginRequestDTO } from "../dtos/auth.dto";

export const loginSchema = Joi.object<LoginRequestDTO>({
    email: Joi.string().email().required().messages({
        "string.email": "Email must be a valid email address",
        "any.required": "Email is required",
    }),
    password: Joi.string().min(6).required().messages({
        "string.min": "Password must be at least 6 characters long",
        "any.required": "Password is required",
    }),
});