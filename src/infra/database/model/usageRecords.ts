import { pool } from "../../../config/database.config";


export class UsageRecordsModel {
    async createTable() {
        await pool.query(
            ` CREATE TABLE IF NOT EXISTS usage_records(
                usage_id SERIAL PRIMARY KEY,
                user_id INT NOT NULL REFERENCES users(user_id),
                action VARCHAR(100) NOT NULL,
                used_units INT NOT NULL CHECK(used_units > 0),
                created_at TIMESTAMP DEFAULT NOW()
            );`
        )

        //Composite Index 
        await pool.query(
            `
            CREATE  INDEX IF NOT EXISTS idx_usage_user_created 
            ON usage_records(user_id,created_at);
            `
        )
    }
}