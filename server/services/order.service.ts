import type { NextFunction } from "express";
import { CatchAsyncError } from "../middleware/catchAsyncError";
import OrderModel from "../models/order.model";
import { ErrorHandler } from "../utils/ErrorHandler";

// create new order 
export const newOrder = CatchAsyncError(async (data: any, res:Response, next:NextFunction) => {
    const order = await OrderModel.create(data)
    res.status(201).json({
        success: true,
        order
    })    
})

// Get all orders
export const getAllOrdersService = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const orders = await OrderModel.find().sort({ createdAt: -1 })
        res.status(201).json({
            success: true,
            orders
        })
    } catch (error: any) {
        return next(new ErrorHandler(error.message, 400))
    }
}