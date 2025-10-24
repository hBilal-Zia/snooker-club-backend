import express from "express";
import adminController from "../controllers/admin.controller";
import { validateRequest } from "../middlewears/validator.middlewear";
import { verifyAdmin } from "../middlewears/auth.middlewear";
import { createAdminSchema } from "../validatiors/admin.validator";

const adminRouter = express.Router();

adminRouter.post("/",verifyAdmin, validateRequest(createAdminSchema), adminController.createAdmin);
adminRouter.get("/",verifyAdmin, adminController.getAdmins)
adminRouter.get("/:adminId",verifyAdmin, adminController.getAdmin);
adminRouter.put("/:adminId",verifyAdmin, adminController.upateAdmin);
adminRouter.delete("/:adminId",verifyAdmin, adminController.deleteAdmin);

export default adminRouter;