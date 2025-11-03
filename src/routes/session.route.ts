import express from "express";
import { isAuthorize, verifyAdmin } from "../middlewears/auth.middlewear";
import SessionController from "../controllers/session.controller";

const sessionRouter = express.Router();

sessionRouter.post("/",verifyAdmin, isAuthorize(['super admin', 'admin']), SessionController.createSession);

export default sessionRouter;