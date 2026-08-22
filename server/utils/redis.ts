import { Redis } from 'ioredis'

function redisClient(){
    if(process.env.REDIS_URL){
        console.log('Redisconnected')
        return process.env.REDIS_URL
    } else{
        throw new Error('Redis Connected')
    }
}

export const redis = new Redis(redisClient())