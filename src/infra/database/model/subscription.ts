import { pool } from "../../../config/database.config";


export class SubscriptionModel {
    async createTable() {
        await pool.query(
            ` CREATE TABLE IF NOT EXISTS subscriptions(
                subscription_id SERIAL PRIMARY KEY,
                user_id INT NOT NULL REFERENCES users(user_id),
                plan_id INT NOT NULL REFERENCES plans(plan_id),
                start_date DATE NOT NULL,
                is_active BOOLEAN DEFAULT TRUE,
                created_at TIMESTAMP DEFAULT NOW()
            );`
        )

                //Composite Index 
                await pool.query(
                    `
                    CREATE  INDEX IF NOT EXISTS idx_subscriptions_user_active
                    ON subscriptions(user_id,is_active);
                    `
                )
    }
}