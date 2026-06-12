import { pool } from "../../config/database.config.js";
import { CreateUsageDto } from "./usage.validation.js";

export class UsageRepository {

    async findUserById(userId: number) {
        const result = await pool.query(
            `SELECT user_id
            FROM users
            WHERE user_id = $1`,
            [userId]
        );
        return result.rows[0];
    }

    async createUsage(data: CreateUsageDto) {
        const result = await pool.query(
            `INSERT INTO usage_records
            (
                user_id,
                action,
                used_units
            )
            VALUES ($1,$2,$3)
            RETURNING *
            `,
            [
                data.userId,
                data.action,
                data.usedUnits
            ]
        );
        return result.rows[0];
    }

    async getCurrentUsage(userId: number) {
        const result = await pool.query(
            `SELECT
                p.plan_id,
                p.name,
                p.monthly_quota,
                COALESCE(SUM(ur.used_units),0) AS total_used
            FROM subscriptions s
            INNER JOIN plans p
                ON p.plan_id = s.plan_id
            LEFT JOIN usage_records ur
                ON ur.user_id = s.user_id
                AND DATE_TRUNC('month',ur.created_at) = DATE_TRUNC('month',CURRENT_DATE)
            WHERE s.user_id = $1
            AND s.is_active = TRUE
            GROUP BY
                p.plan_id,
                p.name,
                p.monthly_quota
            `,
            [userId]
        );
        return result.rows[0];
    }

    async getBillingSummary(userId: number) {
        const result = await pool.query(
            `SELECT
                p.plan_id,
                p.name,
                p.monthly_quota,
                p.extra_charge_per_unit,
                COALESCE(SUM(ur.used_units),0) AS total_usage
            FROM subscriptions s
            INNER JOIN plans p
                ON p.plan_id = s.plan_id
            LEFT JOIN usage_records ur
                ON ur.user_id = s.user_id
                AND DATE_TRUNC('month',ur.created_at) = DATE_TRUNC('month',CURRENT_DATE)
            WHERE s.user_id = $1
            AND s.is_active = TRUE
            GROUP BY
                p.plan_id,
                p.name,
                p.monthly_quota,
                p.extra_charge_per_unit
            `,
            [userId]
        );
    
        return result.rows[0];
    }
}