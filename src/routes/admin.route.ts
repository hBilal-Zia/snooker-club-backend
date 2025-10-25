import express from "express";
import adminController from "../controllers/admin.controller";
import { validateRequest } from "../middlewears/validator.middlewear";
import { isAuthorize, verifyAdmin } from "../middlewears/auth.middlewear";
import { createAdminSchema } from "../validatiors/admin.validator";

const adminRouter = express.Router();

adminRouter.post("/",verifyAdmin, isAuthorize(['super admin']), validateRequest(createAdminSchema), adminController.createAdmin);
adminRouter.get("/",verifyAdmin, isAuthorize(['super admin', 'admin']), adminController.getAdmins)
adminRouter.get("/:adminId",verifyAdmin, isAuthorize(['super admin', 'admin']), adminController.getAdmin);
adminRouter.put("/:adminId",verifyAdmin, isAuthorize(['super admin']), adminController.upateAdmin);
adminRouter.delete("/:adminId",verifyAdmin, isAuthorize(['super admin']), adminController.deleteAdmin);

export default adminRouter;