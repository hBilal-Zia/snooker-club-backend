import express from "express";
import { isAuthorize, verifyAdmin } from "../middlewears/auth.middlewear";
import SessionController from "../controllers/session.controller";
import { validateRequest } from "../middlewears/validator.middlewear";
import { createSessionSchema } from "../validatiors/session.validator";

const sessionRouter = express.Router();

sessionRouter.post("/",verifyAdmin, isAuthorize(['super admin', 'admin']), validateRequest(createSessionSchema), SessionController.createSession);  // TODO: add validation
sessionRouter.get("/",verifyAdmin, isAuthorize(['super admin', 'admin']), SessionController.getSessions);
sessionRouter.get("/:sessionId",verifyAdmin, isAuthorize(['super admin', 'admin']), SessionController.getSession);
sessionRouter.patch("/:sessionId/end",verifyAdmin, isAuthorize(['super admin', 'admin']), SessionController.endSession);
sessionRouter.patch("/:sessionId/paid",verifyAdmin, isAuthorize(['super admin', 'admin']), SessionController.updateSessionPaidStatus);

export default sessionRouter;