import NotificationModel from "../models/notification.model";
import { CatchAsyncError } from "../middleware/catchAsyncError";
import { ErrorHandler } from "../utils/ErrorHandler";
import type { Request, Response, NextFunction } from "express";


export const getNotifications = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        // 6 : 49: 00 stream
    } catch (error: any) {
        return next(new ErrorHandler(error.message, 400))  
    }
})