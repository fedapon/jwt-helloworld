import express from 'express'
import jwt from 'jsonwebtoken'
import {ITokenRequest} from './interfaces'

const app = express()
const PORT = 3000
const SECRET = "mySuperSecret"

//middlewares
app.use( express.json() )
app.use( express.urlencoded({extended : false}))

app.get("/", function (req, res) {
    res.status(200).json({ messaje: "You are at /" })
})

app.post("/api/login", function (req, res) {
    const user = {
        email: req.body.email,
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
    jwt.verify(<string>req.body.token, SECRET, (error, authData) => {
        if (error) {
            return res.status(403).json({ messaje: "Forbidden" })
        }
        const response = {
            authData,
            messaje: "You are authorized",
        }
        return res.status(200).json(response)
    })
})

function verifyToken(
    req: ITokenRequest,
    res: express.Response,
    next: express.NextFunction
) {
    const authHeader = req.headers.authorization
    if (authHeader !== undefined) {
        const bearerToken = authHeader.split(" ")[1]
        req.body.token = bearerToken
        next()
    } else {
        return res.status(403).json({ messaje: "Forbidden" })
    }
}

app.listen(PORT, function () {
    console.log(`Server started in port: ${PORT}`)
})
