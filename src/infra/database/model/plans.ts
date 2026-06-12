import { pool } from "../../../config/database.config.js";


export class PlanModel {
    async createTable() {
        await pool.query(
            ` CREATE TABLE IF NOT EXISTS plans(
                plan_id SERIAL PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                monthly_quota INT NOT NULL CHECK(monthly_quota >= 0),
                extra_charge_per_unit DECIMAL(10,2) NOT NULL,
                created_at TIMESTAMP DEFAULT NOW()
            )`
        )
    }
}