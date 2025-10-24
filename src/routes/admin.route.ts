import express from "express";
import adminController from "../controllers/admin.controller";
import { validateRequest } from "../middlewears/validator.middlewear";
import { createAdminSchema } from "../validatiors/admin.validator";

const adminRouter = express.Router();

adminRouter.post("/", validateRequest(createAdminSchema), adminController.createAdmin);
adminRouter.get("/:adminId", adminController.getAdmin);

export default adminRouter;