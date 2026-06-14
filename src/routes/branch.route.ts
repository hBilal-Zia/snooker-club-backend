import express from "express";
import { isAuthorize, verifyAdmin } from "../middlewears/auth.middlewear";
import branchController from "../controllers/branch.controller";
import { validateRequest } from "../middlewears/validator.middlewear";
import { createBranchSchema, updateBranchSchema } from "../validatiors/branch.validator";

const branchRouter = express.Router();

branchRouter.post("/",verifyAdmin, isAuthorize(['super admin']), validateRequest(createBranchSchema),branchController.createBranch);
branchRouter.get("/",verifyAdmin, isAuthorize(['super admin', 'admin']), branchController.getBranches);
branchRouter.get("/:branchId",verifyAdmin, isAuthorize(['super admin', 'admin']), branchController.getBranch);
branchRouter.put("/:branchId",verifyAdmin, isAuthorize(['super admin']), validateRequest(updateBranchSchema),branchController.upateBranch);
branchRouter.delete("/:branchId",verifyAdmin, isAuthorize(['super admin']), branchController.deleteBranch);

export default branchRouter;