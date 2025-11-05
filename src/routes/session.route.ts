import express from "express";
import { isAuthorize, verifyAdmin } from "../middlewears/auth.middlewear";
import SessionController from "../controllers/session.controller";

const sessionRouter = express.Router();

sessionRouter.post("/",verifyAdmin, isAuthorize(['super admin', 'admin']), SessionController.createSession);
sessionRouter.get("/",verifyAdmin, isAuthorize(['super admin', 'admin']), SessionController.getSessions);
sessionRouter.get("/:sessionId",verifyAdmin, isAuthorize(['super admin', 'admin']), SessionController.getSession);
sessionRouter.get("/:sessionId/end",verifyAdmin, isAuthorize(['super admin', 'admin']), SessionController.endSession);

export default sessionRouter;