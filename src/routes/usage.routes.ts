import { Router } from "express";
import { UsageController } from "../modules/usage/usage.controller.js";

const router = Router();

const usageController =new UsageController();
router.post("/usage",usageController.createUsage);
router.get("/users/:id/current-usage",usageController.getCurrentUsage);
router.get("/users/:id/billing-summary",usageController.getBillingSummary);

export default router;