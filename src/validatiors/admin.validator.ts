import Joi from "joi";
import { CreateAdminDTO } from "../dtos/admin.dto";

export const createAdminSchema = Joi.object<CreateAdminDTO>({
    name: Joi.string()
        .min(3)
        .max(50)
        .required()
        .messages({
            "string.empty": "Name is required",
            "string.min": "Name must be at least 3 characters long",
        }),

    email: Joi.string()
        .email()
        .required()
        .messages({
            "string.email": "Please enter a valid email address",
            "string.empty": "Email is required",
        }),
    
    password: Joi.string().min(6).required().messages({
            "string.min": "Password must be at least 6 characters long",
            "any.required": "Password is required",
        }),

    phoneNo: Joi.string()
        .pattern(/^[0-9]{11}$/)
        .required()
        .messages({
            "string.pattern.base": "Phone number must contain only digits (11 characters)",
            "string.empty": "Phone number is required",
        }),

    role: Joi.string()
        .valid("super admin", "admin")
        .required()
        .messages({
            "any.only": "Role must be either 'super admin' or 'admin'",
            "string.empty": "Role is required",
        }),
});
