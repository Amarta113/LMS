import { Response } from 'express';
import { IUser } from '../models/user.model';
import { redis } from './redis';

interface ITokenOptions {
    expire: Date;
    maxAge: number;
    httpOnly: boolean;
    sameSite: 'lax' | 'strict' | 'none' | undefined;
    secure?: boolean;
}

export const sendToken = (user: IUser, statusCode: number, res: Response) => {
    const accessToken = user.SignAccessToken()
    const refreshToken = user.SignRefreshToken();

    // upload session to redis
    redis.set(user._id, JSON.stringify(user) as any)

    // parse environment variable to integrates with fallback values
    const accessTokenExpire = parseInt(process.env.ACCESS_TOKEN_EXPIRE || '300', 10)
    const refreshTokenExpire = parseInt(process.env.ACCESS_REFRESH_EXPIRE || '1200', 10)

    // Option for cookies
    const accessTokenOptions: ITokenOptions = {
        expire: new Date(Date.now() + accessTokenExpire * 60 * 60 * 1000),
        maxAge: accessTokenExpire * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: 'lax',
    }

    const refreshTokenOptions: ITokenOptions = {
        expire: new Date(Date.now() + refreshTokenExpire * 24 * 60 * 60 *  1000),
        maxAge: refreshTokenExpire * 24 * 60 * 60 *  1000,
        httpOnly: true,
        sameSite: 'lax',
    }

    if(process.env.NODE_ENV === 'production'){
        accessTokenOptions.secure = true
    }

    res.cookie("access_token", accessToken, accessTokenOptions)
    res.cookie("refresh_token", refreshToken, refreshTokenOptions)

    res.status(statusCode).json({
        success: true,
        user,
        accessToken
    })
}


