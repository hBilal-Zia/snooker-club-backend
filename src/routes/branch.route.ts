import express from "express";
import { isAuthorize, verifyAdmin } from "../middlewears/auth.middlewear";
import branchController from "../controllers/branch.controller";

const branchRouter = express.Router();

branchRouter.post("/",verifyAdmin, isAuthorize(['super admin']), branchController.createBranch);
branchRouter.get("/",verifyAdmin, isAuthorize(['super admin', 'admin']), branchController.getBranches);
branchRouter.get("/:branchId",verifyAdmin, isAuthorize(['super admin', 'admin']), branchController.getBranch);
// branchRouter.put("/:adminId",verifyAdmin, isAuthorize(['super admin']), adminController.upateAdmin);
// branchRouter.delete("/:adminId",verifyAdmin, isAuthorize(['super admin']), adminController.deleteAdmin);

export default branchRouter;