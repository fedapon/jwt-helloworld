import express from "express"
import authRoutes from "./routes/auth.routes"
import { verifyAuth } from "./middlewares/auth.middlewares"
import userRepository from "./repositories/user.repositories"
import dotenv from "dotenv"
dotenv.config()

export const Users = new userRepository()

const app = express()

//middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use("/api", authRoutes)

app.get("/", verifyAuth, function (req, res) {
    res.status(200).json({
        messaje: `Hello ${req.body.username} - You are at /`,
    })
})

app.listen(process.env.PORT, function () {
    console.log(`Server started in port: ${process.env.PORT}`)
})
