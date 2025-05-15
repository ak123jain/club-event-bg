import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

const app = express()

app.use(cors({
    origin :  process.env.CORS_ORIGIN, 
    credentials : true
}))

 
app.use(express.json({limit : "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
// app.use(express.static("public"))

app.use(cookieParser())

import userRoutes from "./Routes/user.route.js"
import clubRoutes from "./Routes/club.route.js"
import eventRoutes from "./Routes/event.route.js"


app.use("/user", userRoutes)
app.use("/club", clubRoutes)
app.use("/event", eventRoutes)

export { app }
