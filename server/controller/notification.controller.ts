import NotificationModel from "../models/notification.model";
import { CatchAsyncError } from "../middleware/catchAsyncError";
import { ErrorHandler } from "../utils/ErrorHandler";
import type { Request, Response, NextFunction } from "express";

// get all notifications -- only admin
export const getNotifications = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const notifications = await NotificationModel.find().sort({createdAt: -1})   
        res.status(201).json({
            success: true,
            notifications
        })     
    } catch (error: any) {
        return next(new ErrorHandler(error.message, 400))  
    }
})

