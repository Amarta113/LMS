import mongoose from 'mongoose';

export async function connectDB(){
    try {
        await mongoose.connect(`${process.env.DB_URL}`).then( (data:any) => {
            console.log(`Database has been connected with ${data.connection.host}`)
        })
    } catch (error: any) {
        console.log(error.message)
        setTimeout(connectDB, 500)
    }
}

