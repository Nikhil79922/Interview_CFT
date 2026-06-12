import { env } from './config/env'
import app from './app'
import { UserModel } from './infra/database/model/users'
import { PlanModel } from './infra/database/model/plans'
import { SubscriptionModel } from './infra/database/model/subscription'
import { UsageRecordsModel } from './infra/database/model/usageRecords'
import { pool } from './config/database.config'

const port = env.PORT

const users= new UserModel();
const plans= new PlanModel();
const Subscriptions= new SubscriptionModel();
const UsageRecords= new UsageRecordsModel();

//DB initate 
async function initDB(){
    try {
        await users.createTable()
        await plans.createTable()
        await Subscriptions.createTable()
        await UsageRecords.createTable()

        console.log("Database Initialization successfull")

        // Maintaining some connection pools
        await Promise.all(
            Array.from({length :1} ,()=>{
               return pool.query(`SELECT 1`);
            })
        )
    } catch (error) {
        console.error("Errir in Database setup", {error});
        process.exit(1);
    }
}

initDB().then(()=>{
    app.listen(port, () => {
        console.log(`Server is running at port ${port}`)
      })
})
