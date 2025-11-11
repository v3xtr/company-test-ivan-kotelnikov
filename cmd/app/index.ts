import express from 'express'
import dotenv from 'dotenv'
import handlerRoutes from '#internal/delivery/http/routes/bookingRoutes.js'

dotenv.config()

export const app = express()

app.use(express.json())

app.use("/api", handlerRoutes)

app.listen(process.env.PORT, () => console.log(`Server started on port ${process.env.PORT}`))
