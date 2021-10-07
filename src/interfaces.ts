import express from 'express'

export interface ITokenRequest extends express.Request {
    token?: string
}