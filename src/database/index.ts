import { Pool } from "pg"
import { envConfig } from "../config"

import { Error } from "../interfaces/error"
export const pool = new Pool({
    host: envConfig.envVars.POSTGRES_HOST,
    database: envConfig.envVars.POSTGRES_DB_DEV,
    user: envConfig.envVars.POSTGRES_USER,
    password: envConfig.envVars.POSTGRES_PASSWORD,
    port: parseInt(envConfig.envVars.POSTGRES_PORT as string, 10)
})

pool.on("error", (error: Error) => {
    console.log(error.message || "error while connecting to database")
})
