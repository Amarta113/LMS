import express from 'express'
import { authorizeRoles, isAuthenticated } from '../middleware/auth'
import { getCoursesAnalytics, getOrdersAnalytics, getUserAnalytics } from '../controller/analytics.controller'

const anaylticsRouter = express.Router()
anaylticsRouter.get("/get-users-analytics", isAuthenticated, authorizeRoles('admin'), getUserAnalytics)
anaylticsRouter.get("/get-course-analytics", isAuthenticated, authorizeRoles('admin'), getCoursesAnalytics)
anaylticsRouter.get("/get-orders-analytics", isAuthenticated, authorizeRoles('admin'), getOrdersAnalytics)


export default anaylticsRouter