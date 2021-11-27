import express from "express"
import { singIn, login } from "../controllers/auth.controllers"

const authRoutes = express.Router()

authRoutes.post("/singin", singIn)

authRoutes.post("/login", login)

export default authRoutes
