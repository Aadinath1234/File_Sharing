import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();


const DBConnection = async () => {
     const USERNAME = process.env.DB_USERNAME;
     const PASSWORD = process.env.DB_PASSWORD;

     const MONGO_URI = `mongodb://localhost:27017/admin`

     try{
            await mongoose.connect(MONGO_URI, {useNewUrlParser: true});
            console.log('database connected successfully');
     }
     catch(error){
        console.log('error while connecting with the database ', error.message);
     }
}

export default DBConnection; 
