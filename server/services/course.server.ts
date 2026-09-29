import type { NextFunction, Request, Response } from "express";
import CourseModel from "../models/course.model"
import { CatchAsyncError } from "../middleware/catchAsyncError"
import { ErrorHandler } from "../utils/ErrorHandler"

export const createCourse = CatchAsyncError(
    async (data: any, res: Response, next: NextFunction) => {
        try {
            const course = await CourseModel.create(data)
            res.status(201).json({
                success: true,
                course
            })
        } catch (error: any) {
            return next(new ErrorHandler(error.message, 400))
        }
    })

// Get all course
export const getAllCoursesService = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const courses = await CourseModel.find().sort({ createdAt: -1 })
        res.status(201).json({
            success: true,
            courses
        })
    } catch (error: any) {
        return next(new ErrorHandler(error.message, 400))
    }
}