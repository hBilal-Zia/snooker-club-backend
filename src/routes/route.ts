import express from "express";
import authRouter from "./auth.route";
import adminRouter from "./admin.route";
import branchRouter from "./branch.route";

const router = express.Router();

router.use("/auth", authRouter);
router.use("/admins", adminRouter);
router.use("/branches", branchRouter);

export default router;