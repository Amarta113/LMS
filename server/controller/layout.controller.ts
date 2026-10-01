import { type NextFunction, type Request, type Response } from "express";
import { ErrorHandler } from "../utils/ErrorHandler";
import LayoutModel from "../models/layout.model";
import { CatchAsyncError } from "../middleware/catchAsyncError";
import cloudinary from "../utils/cloudinary";


// create layout 
export const createLayout = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { type } = req.body;
        if (type === "Banner") {
            const { image, title, subTitle } = req.body
            const myCloud = await cloudinary.uploader.upload(
                image, {
                folder: "layout"
            })
            const banner = {
                image: {
                    public_id: myCloud.public_id,
                    url: myCloud.secure_url
                },
                title,
                subTitle
            }
            await LayoutModel.create(banner)
        }

        if(type === 'FAQ'){
            const {faq} = req.body 
            await LayoutModel.create(faq)
        }

        if(type === 'Categories'){
            const { categories } = req.body;
            await LayoutModel.create(categories)
        }

        res.status(200).json({
            success: true,
            message: "Layout create successfully!"
        })
    } catch (error: any) {
        return next(new ErrorHandler(error.message, 500))
    }
})