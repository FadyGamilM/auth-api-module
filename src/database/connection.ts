import { envConfig } from "../config"
import { pool } from "./index"
export const connect_to_db = async () => {
    try {

        let client = await pool.connect()
        let checkingQueryResult = await client.query(`SELECT NOW()`)
        client.release()
        console.log(checkingQueryResult.rows)
    } catch (err) {
        console.log("ERROR WHILE SETUP THE DATABASE CONNECTION POOL: ", err)
    }
}