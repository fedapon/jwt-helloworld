import express = require("express")
import jwt = require("jsonwebtoken")

const app = express()
const PORT = 3000
const SECRET = "mySuperSecret"

app.get("/", function (req, res) {
    res.status(200).json({ messaje: "You are at /" })
})

app.get("/api/login", function (req, res) {
    const user = {
        id: 1,
        name: "Tom",
        surname: "Hanks",
    }
    const response: any = {}
    jwt.sign(user, SECRET, {expiresIn: '1d'}, (error, token) => {
        if (error) {
            response.messaje = error.message
            res.status(403).json(response)
            return
        }
        response.messaje = "You are authorized"
        response.token = token
        return res.status(200).json(response)
    })
})

app.get("/api/resource", verifyToken, function (req: ITokenRequest, res) {
    jwt.verify(<string>req.token, SECRET, (error, authDate) => {
        if (error) {
            return res.status(403).json({ messaje: "Forbidden" })
        }
        const response = {
            authDate,
            messaje: "You are authorized",
            token: req.token,
        }
        return res.status(200).json(response)
    })
})

interface ITokenRequest extends express.Request {
    token?: string
}

function verifyToken(
    req: ITokenRequest,
    res: express.Response,
    next: express.NextFunction
) {
    const authHeader = req.headers.authorization
    if (authHeader !== undefined) {
        const bearerToken = authHeader.split(" ")[1]
        req.token = bearerToken
        next()
    } else {
        return res.status(403).json({ messaje: "Forbidden" })
    }
}

app.listen(PORT, function () {
    console.log(`Server started in port: ${PORT}`)
})
