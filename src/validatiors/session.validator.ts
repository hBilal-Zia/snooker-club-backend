import Joi from "joi";
import { CreateSessionRequestDTO } from "../dtos/session.dto";

export const createSessionSchema = Joi.object<CreateSessionRequestDTO>({
  players: Joi.array()
    .items(
      Joi.string()
        .trim()
        .min(3)
        .max(50)
        .required()
        .messages({
          "string.base": "Player name must be a string",
          "string.empty": "Player name cannot be empty",
          "string.min": "Player name must be at least 3 characters long",
          "string.max": "Player name cannot exceed 50 characters",
          "any.required": "Player name is required",
        })
    )
    .min(1)
    .unique()
    .required()
    .messages({
      "array.base": "Players must be an array of player names",
      "array.min": "At least one player is required to start a session",
      "array.unique": "Player names must be unique",
      "any.required": "Players field is required",
    }),

  tableId: Joi.string()
    .pattern(/^[0-9a-fA-F]{24}$/)
    .required()
    .messages({
      "string.base": "Table ID must be a string",
      "string.pattern.base": "Invalid Table ID",
      "string.empty": "Table ID cannot be empty",
      "any.required": "Table ID is required",
    }),

  branchId: Joi.string()
    .pattern(/^[0-9a-fA-F]{24}$/)
    .required()
    .messages({
      "string.base": "Branch ID must be a string",
      "string.pattern.base": "Invalid Branch ID",
      "string.empty": "Branch ID cannot be empty",
      "any.required": "Branch ID is required",
    }),
});