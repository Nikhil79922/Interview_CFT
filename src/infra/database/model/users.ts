import { pool } from "../../../config/database.config.js";


export class UserModel {
    async createTable() {
        await pool.query(
            ` CREATE TABLE IF NOT EXISTS users(
                user_id SERIAL PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                created_at TIMESTAMP DEFAULT NOW()
            )`
        )
    }
}