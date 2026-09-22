import express from 'express'
import { editCourse, getAllCourses, getSingleCourse, uploadCourse } from '../controller/course.controller'
import { authorizeRoles, isAuthenticated } from '../middleware/auth'

const courseRouter = express.Router()
courseRouter.post('/create-course', isAuthenticated, authorizeRoles("admin"), uploadCourse)
courseRouter.put('/edit-course/:id', isAuthenticated, authorizeRoles("admin"), editCourse)
courseRouter.get('/get-single-course/:id', getSingleCourse)
courseRouter.get('/get-all-courses', getAllCourses)

export default courseRouter