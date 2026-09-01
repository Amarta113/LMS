import express from 'express'
import { activateUser, getUserInfo, loginUser, logoutUser, registerationUser, updateAccessToken } from '../controller/user.controller'
import { isAuthenticated } from '../middleware/auth'

const userRouter = express.Router()

userRouter.post('/registration', registerationUser)
userRouter.post('/activate-user', activateUser)
userRouter.post('/login', loginUser)
userRouter.get('/logout', isAuthenticated, logoutUser)
userRouter.get("/refresh", updateAccessToken)
userRouter.get('/me', isAuthenticated, getUserInfo)

export default userRouter;