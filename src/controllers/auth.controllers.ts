import { Request, Response } from "express"
import jwt from "jsonwebtoken"
import { Users } from "./../app"
import UserEntity from "../entities/user.entities"

export async function singIn(req: Request, res: Response) {
    if (req.body.username == undefined || req.body.password == undefined) {
        return res
            .status(400)
            .json({ message: "username and password are required" })
    }
    if (Users.findByUsername(req.body.username)) {
        return res.status(422).json({ message: "username already exists" })
    }
    const newUser = new UserEntity(req.body.username, req.body.password)
    const createdUser = Users.create(newUser)
    const token = await generateToken(createdUser.getUsername())
    return res.status(201).json({
        message: "user successfully created",
        user: {
            id: createdUser.getId(),
            username: createdUser.getUsername(),
            token: token,
        },
    })
}

export async function login(req: Request, res: Response) {
    const user = {
        username: req.body.email,
        password: req.body.password,
    }
    const foundUser = Users.findByUsername(req.body.username)
    if (foundUser == undefined) {
        return res.status(422).json({ message: "user does not exist" })
    }
    if (foundUser.verifyPassword(req.body.password)) {
        const token = await generateToken(foundUser.getUsername())
        return res.status(200).json({
            message: "user successfully authenticated",
            user: {
                id: foundUser.getId(),
                username: foundUser.getUsername(),
                token: token,
            },
        })
    }
    return res.status(401).json({
        message: "user not authenticated. verify username and password",
    })
}

async function generateToken(username: String): Promise<String> {
    return new Promise(function (resolve, reject) {
        jwt.sign(
            { username },
            process.env.SECRET as jwt.Secret,
            { expiresIn: "1d" },
            (error, token) => {
                if (error) {
                    reject(error)
                }
                resolve(token as String)
            }
        )
    })
}
