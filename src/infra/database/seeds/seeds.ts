import { pool } from "../../../config/database.config";


async function seed() {
  try {
    console.log("Seeding started...");

    // Users
    await pool.query(`
      INSERT INTO users (name)
      VALUES
        ('John Doe'),
        ('Jane Smith'),
        ('Mike Johnson')
      ON CONFLICT DO NOTHING;
    `);

    // Plans
    await pool.query(`
      INSERT INTO plans (name, monthly_quota, extra_charge_per_unit)
      VALUES
        ('Basic', 100, 2.50),
        ('Pro', 500, 1.50),
        ('Enterprise', 1000, 0.75)
      ON CONFLICT DO NOTHING;
    `);

    // Subscriptions
    await pool.query(`
      INSERT INTO subscriptions (
        user_id,
        plan_id,
        start_date,
        is_active
      )
      VALUES
        (1, 1, CURRENT_DATE, TRUE),
        (2, 2, CURRENT_DATE, TRUE),
        (3, 3, CURRENT_DATE, TRUE)
      ON CONFLICT DO NOTHING;
    `);

    // Usage Records (Current Month)
    await pool.query(`
      INSERT INTO usage_records (
        user_id,
        action,
        used_units
      )
      VALUES
        (1, 'api_call', 30),
        (1, 'api_call', 50),

        (2, 'file_upload', 200),
        (2, 'api_call', 150),

        (3, 'report_generation', 400),
        (3, 'api_call', 350);
    `);

    console.log("Seed completed successfully");
  } catch (error) {
    console.error(" Seed failed:", error);
  } finally {
    await pool.end();
  }
}

seed();