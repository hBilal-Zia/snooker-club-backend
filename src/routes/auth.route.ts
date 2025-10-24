import express from "express";
import authController from "../controllers/auth.controller";
import { validateRequest } from "../middlewears/validator.middlewear";
import { loginSchema } from "../validatiors/auth.validator";

const authRouter = express.Router();

authRouter.post("/login", validateRequest(loginSchema), authController.login);

export default authRouter;