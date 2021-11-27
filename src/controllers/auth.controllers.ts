import { Request, Response } from "express"
import jwt from 'jsonwebtoken'
import UserEntity from "../entities/user.entities"
import User from '../app'

export function singIn(req: Request, res: Response) {
    return res.json({ message: "sing in" })
}

export function login(req: Request, res: Response) {
    const user = {
        username: req.body.email,
        password: req.body.password
    }
    const response = {
        message: '',
        token: ''
    }
    jwt.sign(user, process.env.SECRET as jwt.Secret, {expiresIn: '1d'}, (error, token) => {
        if (error) {
            response.message = error.message
            res.status(403).json(response)
            return
        }
        response.message = "You are authenticated"
        response.token = token as string
        return res.status(200).json(response)
    })
}
