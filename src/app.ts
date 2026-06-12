import express from 'express';
import cors from 'cors';
import usageRoutes from './routes/usage.routes.js'
import errorMiddleware from './shared/middleware/error.middleware.js';


const app = express()


app.use(cors());
app.use(express.json());

app.use("/api", usageRoutes);

app.use(errorMiddleware)

export default app
