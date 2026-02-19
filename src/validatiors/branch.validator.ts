import Joi from "joi";
import { CreateBranchRequestDTO, UpdateBranchRequestDTO } from "../dtos/branch.dto";

export const createBranchSchema = Joi.object<CreateBranchRequestDTO>({
  name: Joi.string()
    .trim()
    .min(3)
    .max(100)
    .required()
    .messages({
      "string.base": "Branch name must be a string",
      "string.empty": "Branch name cannot be empty",
      "string.min": "Branch name must be at least 3 characters long",
      "string.max": "Branch name cannot exceed 100 characters",
      "any.required": "Branch name is required",
    }),

  location: Joi.string()
    .trim()
    .min(3)
    .max(200)
    .required()
    .messages({
      "string.base": "Location must be a string",
      "string.empty": "Location cannot be empty",
      "string.min": "Location must be at least 3 characters long",
      "string.max": "Location cannot exceed 200 characters",
      "any.required": "Location is required",
    }),
});

export const updateBranchSchema = Joi.object<UpdateBranchRequestDTO>({
  name: Joi.string()
    .trim()
    .min(3)
    .max(100)
    .required()
    .messages({
      "string.base": "Branch name must be a string",
      "string.empty": "Branch name cannot be empty",
      "string.min": "Branch name must be at least 3 characters long",
      "string.max": "Branch name cannot exceed 100 characters",
      "any.required": "Name is required",
    }),

  location: Joi.string()
    .trim()
    .min(3)
    .max(200)
    .required()
    .messages({
      "string.base": "Location must be a string",
      "string.empty": "Location cannot be empty",
      "string.min": "Location must be at least 3 characters long",
      "string.max": "Location cannot exceed 200 characters",
      "any.required": "Location is required",
    }),
});
