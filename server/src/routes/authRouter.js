import express from 'express'
import { login, refreshToken, register } from '../controllers/auth.js'


export const authRouter = express.Router()



authRouter.post('/auth/register', register)
authRouter.post('/auth/login', login)
authRouter.get('/auth/refresh', refreshToken)

