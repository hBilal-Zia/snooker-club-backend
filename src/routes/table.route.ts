import express from "express";
import { isAuthorize, verifyAdmin } from "../middlewears/auth.middlewear";
import tableController from "../controllers/table.controller";

const tableRouter = express.Router();

tableRouter.post("/",verifyAdmin, isAuthorize(['super admin', 'admin']), tableController.createTable);

export default tableRouter;