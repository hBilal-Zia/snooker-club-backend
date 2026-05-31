import Joi from "joi";
import { LoginRequestDTO, RefreshTokenRequestDTO } from "../dtos/auth.dto";

export const loginSchema = Joi.object<LoginRequestDTO>({
    email: Joi.string().email().required().messages({
        "string.empty": "Email cannot be empty",
        "string.email": "Email must be a valid email address",
        "any.required": "Email is required",
    }),
    password: Joi.string().required().messages({
        "string.empty": "Password cannot be empty",
        "any.required": "Password is required",
    }),
});

export const refreshTokenSchema = Joi.object<RefreshTokenRequestDTO>({
    refreshToken: Joi.string().trim().required().messages({
        "string.empty": "Refresh token cannot be empty",
        "any.required": "Refresh token is required",
    }),
});