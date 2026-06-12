# Interview_CFT

Backend assignment built using Node.js, TypeScript, Express.js, and PostgreSQL for subscription usage tracking and billing calculation.

### Run Locally

```bash
npm install
```

Configure the database connection in the `.env` file and start the server:

```bash
npm run dev
```

To insert sample data for testing:

```bash
npm run seed
```

Available APIs:

* `POST /api/usage`
* `GET /api/users/:id/current-usage`
* `GET /api/users/:id/billing-summary`
