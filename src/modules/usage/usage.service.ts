import AppError from "../../shared/errorHandler/AppError.js";
import { UsageRepository } from "./usage.repository.js";
import { CreateUsageDto } from "./usage.validation.js";

export class UsageService {
    private usageRepository = new UsageRepository();
    async createUsage(data: CreateUsageDto) {
        const user = await this.usageRepository.findUserById(data.userId);
        if (!user) {
            throw new AppError("User not found",400);
        }
        return await this.usageRepository.createUsage(data);
    }

    async getCurrentUsage(userId: number) {
         const usage =await this.usageRepository.getCurrentUsage(userId);
        if (!usage) {
            throw new AppError("Active subscription not found",404);
        }
    const totalUsed = Number(usage.total_used);
        return {totalUsed,remainingUnits: Math.max(0, usage.monthly_quota - totalUsed),
            activePlan: {
                planId: usage.plan_id,
                name: usage.name,
                monthlyQuota: usage.monthly_quota
            }
        };
    }

    async getBillingSummary(userId: number) {
        const billing = await this.usageRepository.getBillingSummary(userId);
        if (!billing) {
            throw new AppError("Active subscription not found",404);
        }
        const totalUsage = Number(billing.total_usage);
        const planQuota = Number(billing.monthly_quota);
        const extraChargePerUnit = Number(billing.extra_charge_per_unit);
        const extraUnits = totalUsage > planQuota ? totalUsage - planQuota: 0;
        const extraCharges = Number((extraUnits * extraChargePerUnit).toFixed(2));
        return {
            totalUsage,
            planQuota,
            extraUnits,
            extraCharges,
            activePlan: {
                planId: billing.plan_id,
                name: billing.name,
                monthlyQuota: planQuota,
                extraChargePerUnit
            }
        };
    }
}