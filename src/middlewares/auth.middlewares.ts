import { Request, Response, NextFunction } from "express"
import jwt from "jsonwebtoken"
import { Users } from "./../app"

export async function verifyAuth(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const authHeader = req.headers.authorization
    if (authHeader !== undefined) {
        const bearerToken = authHeader.split(" ")[1]
        try {
            const payload = await verifyJwt(bearerToken)
            const foundUser = Users.findByUsername(payload.username)
            if (foundUser) {
                req.body.username = foundUser.getUsername()
                return next()
            }
            return res
                .status(403)
                .json({ messaje: "Forbidden", error: "user does not exist" })
        } catch (error) {
            const err = error as jwt.JsonWebTokenError
            return res
                .status(403)
                .json({ messaje: "Forbidden", error: err.message })
        }
    } else {
        return res.status(403).json({ message: "Forbidden" })
    }
}

async function verifyJwt(token: string): Promise<jwt.JwtPayload> {
    return new Promise(function (resolve, reject) {
        jwt.verify(
            token,
            process.env.SECRET as jwt.Secret,
            (error, authData) => {
                if (error) {
                    reject(error)
                }
                resolve(authData as jwt.JwtPayload)
            }
        )
    })
}
