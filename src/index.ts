import express from 'express'
import "reflect-metadata"
import { createConnection } from "typeorm"
import { User } from "entities/User"
import userRoutes from "./routes/userRoutes"
import bodyParser  from 'body-parser'
import {requestLogger} from "./middlewares/RequestLoggingMiddleware"
import { errorMiddleware } from './middlewares/ErrorMiddleware'

const main = async() => {
    try {
        const connection = await createConnection();
        console.log("Connected to database");
        
        const app = express()
        const PORT = process.env.PORT || 3000
        app.use(bodyParser.json())
        app.use(bodyParser.urlencoded({extended: true}))

        app.use(requestLogger)
        app.use('/api', userRoutes)
        app.use(errorMiddleware)

        app.listen(PORT, () => {
            console.log(`Server listening on port ${PORT}...`);
        })
        
    } catch (error) {
        console.log("Error connecting to db", error);
        
    }
}

main();