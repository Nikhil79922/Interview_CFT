import express from 'express';
import cors from 'cors';
import usageRoutes from './routes/usage.routes'
import errorMiddleware from './shared/middleware/error.middleware';


const app = express()


app.use(cors());
app.use(express.json());

app.use("/api", usageRoutes);

app.use(errorMiddleware)

export default app
