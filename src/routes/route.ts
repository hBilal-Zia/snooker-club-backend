import express from "express";
import authRouter from "./auth.route";
import adminRouter from "./admin.route";
import branchRouter from "./branch.route";
import tableRouter from "./table.route";

const router = express.Router();

router.use("/auth", authRouter);
router.use("/admins", adminRouter);
router.use("/branches", branchRouter);
router.use("/tables", tableRouter);

export default router;