import express from "express";
import { isAuthorize, verifyAdmin } from "../middlewears/auth.middlewear";
import tableController from "../controllers/table.controller";
import { validateRequest } from "../middlewears/validator.middlewear";
import { createTableSchema, updateTableSchema } from "../validatiors/table.validator";

const tableRouter = express.Router();

tableRouter.post("/",verifyAdmin, isAuthorize(['super admin', 'admin']), validateRequest(createTableSchema), tableController.createTable);
tableRouter.get("/",verifyAdmin, isAuthorize(['super admin', 'admin']), tableController.getTables);
tableRouter.get("/:tableId",verifyAdmin, isAuthorize(['super admin', 'admin']), tableController.getTable);
tableRouter.put("/:tableId",verifyAdmin, isAuthorize(['super admin', 'admin']), validateRequest(updateTableSchema), tableController.upadteTable);
tableRouter.delete("/:tableId",verifyAdmin, isAuthorize(['super admin', 'admin']), tableController.deleteTable);

export default tableRouter;