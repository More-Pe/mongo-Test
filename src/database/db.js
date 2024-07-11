import mongoose from 'mongoose';

const MONGO_URI = `mongodb://root:1234@127.0.0.1:27017/test?authSource=admin`;

export const dbConnection = () => {
    console.log('Start connection');
   return mongoose.connect(
    process.env.MONGO_URI,
    {}
)
}