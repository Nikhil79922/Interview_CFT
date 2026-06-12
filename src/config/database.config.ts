import {Pool} from 'pg';
import { env } from './env.js';

export const  pool = new Pool({
    connectionString: env.DATABASE_URL as string,
    ssl:false,
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 10000,
    maxLifetimeSeconds: 60,
  })