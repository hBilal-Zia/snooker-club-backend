import express from "express";
import { isAuthorize, verifyAdmin } from "../middlewears/auth.middlewear";
import tableController from "../controllers/table.controller";

const tableRouter = express.Router();

tableRouter.post("/",verifyAdmin, isAuthorize(['super admin', 'admin']), tableController.createTable);
tableRouter.get("/",verifyAdmin, isAuthorize(['super admin', 'admin']), tableController.getTables);
tableRouter.get("/:tableId",verifyAdmin, isAuthorize(['super admin', 'admin']), tableController.getTable);
tableRouter.put("/:tableId",verifyAdmin, isAuthorize(['super admin', 'admin']), tableController.upadteTable);
tableRouter.delete("/:tableId",verifyAdmin, isAuthorize(['super admin', 'admin']), tableController.deleteTable);

export default tableRouter;