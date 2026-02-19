import Joi from "joi";
import { CreateTableRequestDTO } from "../dtos/table.dto";

export const createTableSchema = Joi.object<CreateTableRequestDTO>({
  name: Joi.string()
    .trim()
    .min(3)
    .max(100)
    .required()
    .messages({
      "string.base": "Name must be a string",
      "string.empty": "Name cannot be empty",
      "string.min": "Name must be at least 3 characters long",
      "string.max": "Name cannot exceed 100 characters",
      "any.required": "Name is required",
    }),

  description: Joi.string()
    .trim()
    .min(5)
    .max(500)
    .required()
    .messages({
      "string.base": "Description must be a string",
      "string.empty": "Description cannot be empty",
      "string.min": "Description must be at least 5 characters long",
      "string.max": "Description cannot exceed 500 characters",
      "any.required": "Description is required",
    }),

  ratePerMinute: Joi.number()
    .positive()
    .required()
    .messages({
      "number.base": "Rate per minute must be a number",
      "number.positive": "Rate per minute must be greater than 0",
      "any.required": "Rate per minute is required",
    }),

  branchId: Joi.string()
    .pattern(/^[0-9a-fA-F]{24}$/)
    .required()
    .messages({
      "string.pattern.base": "Invlaid Branch ID",
      "string.empty": "Branch ID cannot be empty",
      "any.required": "Branch ID is required",
    }),
});
