import express from "express";
import authRouter from "./auth.route";
import adminRouter from "./admin.route";
import branchRouter from "./branch.route";
import tableRouter from "./table.route";
import sessionRouter from "./session.route";

const router = express.Router();

router.use("/auth", authRouter);
router.use("/admins", adminRouter);
router.use("/branches", branchRouter);
router.use("/tables", tableRouter);
router.use("/sessions", sessionRouter);

export default router;